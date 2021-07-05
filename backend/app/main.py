from flask import request, render_template, jsonify, Flask
from app import app
import json
import sys
from .create_db import Article, Stock, Company, db, create_stonkdb

@app.route('/')
def index():
    return "Stonk Alert API"

@app.route('/api/stock')
def get_stock():
    # get symbol=<string> query param and find corresponding stock
    ticker = request.args.get('symbol', default = "", type = str)
    stock = db.session.query(Stock).filter(Stock.ticker == ticker).first()

    if stock is None:
        return "Requested stock or route not supported in the Stonk Alert API."

    return jsonify(stock.format())

@app.route('/api/stocks')
def get_stocks():
    return "Stonk Alert API"

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
    return "Stonk Alert API"

