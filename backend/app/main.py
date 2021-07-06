from flask import request, render_template, jsonify, Flask
from app import app
import json
import sys
from .create_db import Article, Stock, Company, db, create_stonkdb

from sqlalchemy import desc, exists

@app.route('/')
def index():
    return "Stonk Alert API"

@app.route('/api/stock')
def get_stock():
    # get symbol=<string> query param and find corresponding stock
    ticker = request.args.get('symbol', default = "", type = str)
    stock = db.session.query(Stock).filter(Stock.ticker == ticker).first()

    print(stock)
    if stock is None:
        return "Requested stock or route not supported in the Stonk Alert API."

    return jsonify(stock.format())

@app.route('/api/stocks')
def get_stocks():
    sort =  request.args.get('sort', default="ticker", type = str)
    asc =   request.args.get('asc', default='True', type = str)
    limit = request.args.get('limit', default=10,type = int)
    
    # have to set stocklist to empty list in order to get a list of stocks
    # doing a direct equals to the query will assign it to the actual sql query format
    stockList =[]
    if asc == 'True':
        stockList += db.session.query(Stock).order_by(sort).limit(limit)
    else:
        print("asdf")
        stockList += db.session.query(Stock).order_by(desc(sort)).limit(limit)
    
    print(stockList)
    result = map(lambda x: x.format(), stockList)
    

    return jsonify(list(result))



@app.route('/api/company')
def get_company():
    # get symbol=<string> query param and find corresponding company
    ticker = request.args.get('symbol', default = "", type = str)
    company = db.session.query(Company).filter(Company.stock == ticker).first()

    if company is None:
        return "Requested company or route not supported in the Stonk Alert API."

    return jsonify(company.format())

@app.route('/api/companies')
def get_companies():
    return "Stonk Alert API"

@app.route('/api/article', methods=['GET'])
def get_article():
    # get id=<int> query param and find corresponding article
    id = request.args.get('id', default = 1, type = int)
    article = db.session.query(Article).filter(Article.id == id).first()

    if article is None:
        return "Requested article or route not supported in the Stonk Alert API."

    return jsonify(article.format())

@app.route('/api/news')
def get_news():
    news = []

    # must sort/filter database (symbol for filtering, sort/asc for sorting)
    sort = request.args.get('symbol', default = "datetime", type = str) # 'headline', 'datetime', 'source', 'link', 'summary', 'ticker'
    asc = request.args.get('asc', default = 'True', type = str)
    limit = request.args.get('limit', default = 10, type = int) # how many articles will be returned
    symbol = request.args.get('symbol', default = "", type = str) # filter out by stock
    
    # symbol is not empty and exists in database
    if symbol and db.session.query(Article.query.filter(Article.ticker == symbol).exists()).scalar():
        if asc == 'True':
            news += db.session.query(Article).order_by(sort).limit(limit).filter(Article.ticker == symbol)
        else:
            news += db.session.query(Article).order_by(desc(sort)).limit(limit).filter(Article.ticker == symbol)
    elif symbol: # symbol is not empty but doesn't exit in database
        return "Requested stock not supported in the Stonk Alert API."
    else: # symbol is empty, so return news without ticker filter
        if asc == 'True':
            news += db.session.query(Article).order_by(sort).limit(limit)
        else:
            news += db.session.query(Article).order_by(desc(sort)).limit(limit)

    result = map(lambda x: x.format(), news)

    return jsonify(list(result))
