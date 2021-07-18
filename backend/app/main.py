from flask import request, render_template, jsonify, Flask, Markup
from app import app
import json
import time
import sys
import io
import subprocess
import functools
from .create_db import Article, Stock, Company, db, create_stonkdb

from sqlalchemy import desc, exists, case

@app.route('/api')
def index():
    return "Stonk Alert API"

@app.route('/api/tests', methods=["GET"])
def run_tests():
    return render_template('index.html', output=test_output()) # populate template with unit tests

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


    # handles the tradescore and investscore
    # ascending => C -> A+
    # descending => A+ -> C
    if sort == 'tradescore':
        sort = case(
                    (Stock.tradescore == "A+", 7),
                    (Stock.tradescore == "A", 6),
                    (Stock.tradescore == "A-", 5),
                    (Stock.tradescore == "B+", 4),
                    (Stock.tradescore == "B", 3),
                    (Stock.tradescore == "B-", 2),
                    (Stock.tradescore == "C", 1)
                    )
    elif sort == 'investscore':
        sort = case(
                    (Stock.investscore == "A+", 7),
                    (Stock.investscore == "A", 6),
                    (Stock.investscore == "A-", 5),
                    (Stock.investscore == "B+", 4),
                    (Stock.investscore == "B", 3),
                    (Stock.investscore == "B-", 2),
                    (Stock.investscore == "C", 1)
                    )

    # have to set stocklist to empty list in order to get a list of stocks
    # doing a direct equals to the query will assign it to the actual sql query format
    stockList =[]
    if asc.lower() == 'true':
        stockList += db.session.query(Stock).order_by(sort).limit(limit)
    elif asc.lower() == 'false':
        stockList += db.session.query(Stock).order_by(desc(sort)).limit(limit)


  
    result = map(lambda x: x.format(), stockList)

    return jsonify(list(result))

def test_output():
    file = open("output.txt", encoding="utf8")
    output = file.read()
    file.close()
    file = open("db_output.txt", encoding="utf8")
    output += "\n" + file.read()
    file.close()
    file = open("post_output.txt", encoding="utf8")
    output += "\n" + file.read()
    file.close()
    output = output.replace('\n', '<br />')
    output = Markup(output)
    time.sleep(9) # so process finishes to get correct output
    return output

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
