from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__) 

USER = os.environ.get("MODELS_USER")
PASSWORD = os.environ.get("MODELS_PASS")
PUBLIC_IP_ADDRESS = os.environ.get("MODELS_IP")
DBNAME = os.environ.get("MODELS_DBNAME")

# Configuration 
app.config['SQLALCHEMY_DATABASE_URI'] = \
os.environ.get("DB_STRING",f'postgresql://{USER}:{PASSWORD}@{PUBLIC_IP_ADDRESS}/{DBNAME}')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True  # To suppress a warning message
db = SQLAlchemy(app)

# list of all stocks covered by finnhub api stock symbol call

# One-To-One relation: company to stock
class Company(db.Model):
    __tablename__ = 'company'
    
    id = db.Column(db.Integer, primary_key = True) # use number id instead of ticker symbol for URL
    name = db.Column(db.String) # covered by finnhub company profile
    country = db.Column(db.String) # covered by finnhub company profile
    industry = db.Column(db.String) # covered by finnhub company profile
    exchange = db.Column(db.String) # covered by finnhub company profile
    website = db.Column(db.String) # covered by finnhub company profile

    stock = db.relationship('Stock', backref = 'company', uselist = False)

class Stock(db.Model):
    __tablename__ = 'stock'

    ticker = db.Column(db.String, primary_key = True) # covered by symbol at beginning
    open = db.Column(db.Float) # covered by finnhub quote
    high = db.Column(db.Float) # covered by finnhub quote
    low = db.Column(db.Float) # covered by finnhub quote
    close = db.Column(db.Float) # covered by finnhub quote
    current = db.Column(db.Float) # covered by finnhub quote
    company = db.Column(db.String, db.ForeignKey('company.name')) # access stock company name through company

    news = db.relationship('Article', backref = 'stock') # one to many: stock to many news about this stock

class Article(db.Model):
    __tablename__ = 'article'

    id = db.Column(db.Integer, primary_key = True) # use number id instead of ticker symbol for URL
    headline = db.Column(db.String) # covered by iexcloud news
    datetime = db.Column(db.Integer) # covered by iexcloud news (in unix epoch milliseconds time)
    source = db.Column(db.String) # covered by iexcloud news
    link = db.Column(db.String) # covered by iexcloud news
    summary = db.Column(db.String) # covered by iexcloud news
    ticker = db.Column(db.String, db.ForeignKey('stock.ticker')) # access stock ticker through stock
    company = db.Column(db.String, db.ForeignKey('stock.company')) # access stock company through stock