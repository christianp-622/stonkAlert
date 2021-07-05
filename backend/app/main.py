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
    return "Stonk Alert API"

@app.route('/api/stocks')
def get_stocks():
    return "Stonk Alert API"

@app.route('/api/company')
def get_company():
    return "Stonk Alert API"

@app.route('/api/companies')
def get_companies():
    return "Stonk Alert API"

@app.route('/api/article', methods=['GET'])
def get_article():
    # first article test
    article = db.session.query(Article).filter(Article.id == 1).first()

    return jsonify(article.format())

@app.route('/api/news')
def get_news():
    return "Stonk Alert API"

