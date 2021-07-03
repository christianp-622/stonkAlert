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
    name = db.Column(db.String) # covered by alpha vantage company overview
    location = db.Column(db.String) # covered by alpha vantage company overview
    industry = db.Column(db.String) # covered by alpha vantage company overview
    dps = db.Column(db.Float) # covered by alpha vantage company overview (dividends per share)
    eps = db.Column(db.Float) # covered by alpha vantage company overview (earnings per share)
    description = db.Column(db.String) # covered by alpha vantage company overview

    stock = db.relationship('Stock', backref = 'company', uselist = False)

class Stock(db.Model):
    __tablename__ = 'stock'

    ticker = db.Column(db.String, primary_key = True) # covered by alpha vantage company overview
    sector = db.Column(db.String) # covered by alpha vantage company overview
    price = db.Column(db.Float) # covered by alpha vantage company overview
    exchange = db.Column(db.String) # covered by alpha vantage company overview
    traderscore = db.Column(db.String) # covered by styvio
    investorscore = db.Column(db.String)  # covered by styvio
    company = db.Column(db.String, db.ForeignKey('company.name')) # access stock company name through company

    news = db.relationship('Article', backref = 'stock') # one to many: stock to many news about this stock