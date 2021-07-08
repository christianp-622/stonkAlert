from flask import request, render_template, jsonify, Flask, Markup
from app import app
import json
import time
import sys
import io
import subprocess
import functools
from .models import Article, Stock, Company, db

from sqlalchemy import desc, exists, case

@app.route('/api')
def index():
    return "Stonk Alert API"

@app.route('/api/tests', methods=["GET"])
def run_tests():
    return render_template('index.html', output=test_output(), db_output=test_database()) # populate template with unit test results

def test_output():
    file = open("output.txt")
    p = subprocess.Popen('make output-tests', shell=True) # run tests.py, which redirects output to txt file
    output = file.read()
    file.close()
    output = output.replace('\n', '<br />')
    output = Markup(output)
    time.sleep(2) # so process finishes to get correct output
    return output

def test_database():
    file = open("db_output.txt")
    p = subprocess.Popen("make database-tests",shell=True)
    output = file.read()
    file.close()
    output = output.replace('\n', '<br />')
    output = Markup(output)
    time.sleep(4) # so process finishes to get correct output
    return output


@app.route('/api/stock', methods=["GET"])
def get_stock():
    # get symbol=<string> query param and find corresponding stock
    ticker = request.args.get('symbol', default = "", type = str)
    stock = db.session.query(Stock).filter(Stock.ticker == ticker).first()

    if stock is None:
        return "Requested stock or route not supported in the Stonk Alert API."

    return jsonify(stock.format())

@app.route('/api/stocks', methods=["GET"])
def get_stocks():
    sort =  request.args.get('sort', default="ticker", type = str)
    asc =   request.args.get('asc', default='True', type = str)
    limit = request.args.get('limit', default=10,type = int)
    
    # preconditions/defaults
    if sort not in ['ticker', 'price', 'tradescore', 'investscore', 'marketcap', 'sector']:
        sort = 'ticker'
    if asc.lower() not in ['true', 'false']:
        asc = 'true'
    if limit < 0:
        limit = 0

    # have to set stocklist to empty list in order to get a list of stocks
    # doing a direct equals to the query will assign it to the actual sql query format
    stockList =[]
    if asc.lower() == 'true':
        stockList += db.session.query(Stock).order_by(sort).limit(limit)
    elif asc.lower() == 'false':
        stockList += db.session.query(Stock).order_by(desc(sort)).limit(limit)

    result = map(lambda x: x.format(), stockList)

    if sort == 'tradescore':
        result=list(result)
        result_sort_grade =sorted(result, key=functools.cmp_to_key(trade_cmp), reverse = asc.lower()== 'false')
        return jsonify(result_sort_grade)

    if sort == 'investscore':
        result=list(result)
        result_sort_grade =sorted(result, key=functools.cmp_to_key(invest_cmp), reverse = asc.lower()== 'false')
        return jsonify(result_sort_grade)
    
    return jsonify(list(result))

# helper functions to ensure that grades a properly sorted A+ > A-
def trade_cmp(a,b):
    mapping = {'A+': 11,'A': 10, 'A-': 9, 'B+': 8, 'B': 7, 'B-': 6, 'C+': 5, 'C': 4, 'C-': 3, 'D+': 2, 'D': 1, 'F': 0}
    A = mapping[a['tradescore']]
    B = mapping[b['tradescore']]
    if A > B:
        return 1
    elif A < B:
        return -1
    else:
        return 0

def invest_cmp(a,b):
    mapping = {'A+': 11,'A': 10, 'A-': 9, 'B+': 8, 'B': 7, 'B-': 6, 'C+': 5, 'C': 4, 'C-': 3, 'D+': 2, 'D': 1, 'F': 0}
    A = mapping[a['investscore']]
    B = mapping[b['investscore']]
    if A > B:
        return 1
    elif A < B:
        return -1
    else:
        return 0



@app.route('/api/company', methods=["GET"])
def get_company():
    # get symbol=<string> query param and find corresponding company
    ticker = request.args.get('symbol', default = "", type = str)
    company = db.session.query(Company).filter(Company.stock == ticker).first()

    if company is None:
        return "Requested company or route not supported in the Stonk Alert API."

    return jsonify(company.format())

@app.route('/api/companies', methods=["GET"])
def get_companies():
    companies = []

    # must sort/filter database (sort/asc for sorting)
    sort = request.args.get('sort', default = "name", type = str)
    asc = request.args.get('asc', default = 'True', type = str)
    limit = request.args.get('limit', default = 10, type = int) # how many articles will be returned
    
    # preconditions/defaults
    if sort not in ['name', 'country', 'industry', 'exchange', 'website', 'description', 'stock']:
        sort = 'name'
    if asc.lower() not in ['true', 'false']:
        asc = 'true'
    if limit < 0:
        limit = 0

    if asc.lower() == 'true':
        companies += db.session.query(Company).order_by(sort).limit(limit)
    elif asc.lower() == 'false':
        companies += db.session.query(Company).order_by(desc(sort)).limit(limit)

    result = map(lambda x: x.format(), companies)
    return jsonify(list(result))

@app.route('/api/article', methods=['GET'])
def get_article():
    # get id=<int> query param and find corresponding article
    id = request.args.get('id', default = 1, type = int)
    article = db.session.query(Article).filter(Article.id == id).first()

    if article is None:
        return "Requested article or route not supported in the Stonk Alert API."

    return jsonify(article.format())

@app.route('/api/news', methods=["GET"])
def get_news():
    news = []

    # must sort/filter database (symbol for filtering, sort/asc for sorting)
    sort = request.args.get('sort', default = "datetime", type = str) # 'headline', 'datetime', 'source', 'link', 'summary', 'ticker'
    asc = request.args.get('asc', default = 'True', type = str)
    limit = request.args.get('limit', default = 10, type = int) # how many articles will be returned
    symbol = request.args.get('symbol', default = "", type = str) # filter out by stock
    
    # preconditions/defaults
    if sort not in ['headline', 'datetime', 'source', 'link', 'summary', 'ticker']:
        sort = 'datetime'
    if asc.lower() not in ['true', 'false']:
        asc = 'true'
    if limit < 0:
        limit = 0

    # symbol is not empty and exists in database
    if symbol and db.session.query(Article.query.filter(Article.ticker == symbol).exists()).scalar():
        if asc.lower() == 'true':
            news += db.session.query(Article).order_by(sort).filter(Article.ticker == symbol).limit(limit)
        elif asc.lower() == 'false':
            news += db.session.query(Article).order_by(desc(sort)).filter(Article.ticker == symbol).limit(limit)
    elif symbol: # symbol is not empty but doesn't exit in database
        return "Requested stock not supported in the Stonk Alert API."
    else: # symbol is empty, so return news without ticker filter
        if asc.lower() == 'true':
            news += db.session.query(Article).order_by(sort).limit(limit)
        elif asc.lower() == 'false':
            news += db.session.query(Article).order_by(desc(sort)).limit(limit)

    result = map(lambda x: x.format(), news)
    return jsonify(list(result))
