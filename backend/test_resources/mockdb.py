from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

app = Flask(__name__, instance_relative_config=True)
CORS(app)

USER = os.environ.get("MODELS_USER")
PASSWORD = os.environ.get("MODELS_PASS")
PUBLIC_IP_ADDRESS = os.environ.get("MODELS_IP")
DBNAME = os.environ.get("MOCK_DBNAME")

# Configuration 
app.config['SQLALCHEMY_DATABASE_URI'] = \
os.environ.get("DB_STRING",f'postgresql://{USER}:{PASSWORD}@{PUBLIC_IP_ADDRESS}/{DBNAME}')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True  # To suppress a warning message
db = SQLAlchemy(app)



#-----------------------------
#   mockdb.py emulates the database used for stonkalert without doing the initial scrape and population
#----------------------------


# One-To-One relation: stock to company
class Company(db.Model):
    """
    Company Model
    Attributes: name, country, industry, exchange, logo, website, description, stock
    Relationships: Stock/Company (One To One) 
    """
    __tablename__ = 'company'
    
    # id = db.Column(db.Integer, primary_key = True, autoincrement = "auto") # use number id instead of ticker symbol for URL
    name = db.Column(db.String) # covered by iexcloud company https://iexcloud.io/docs/api/#company
    country = db.Column(db.String) # covered by iexcloud company
    industry = db.Column(db.String) # covered by iexcloud company
    exchange = db.Column(db.String) # covered by iexcloud company
    logo = db.Column(db.String) # covered by styvio
    website = db.Column(db.String) # covered by iexcloud company
    description = db.Column(db.String) # covered by iexcloud company
    
    stock = db.Column(db.String, db.ForeignKey('stock.ticker'), primary_key = True) # stock to company relationship, also primary key

    # formatting for json dump
    def format(self):
        return {
            "name": self.name,
            "country": self.country,
            "industry": self.industry,
            "exchange": self.exchange,
            "logo": self.logo,
            "website": self.website,
            "description": self.description,
            "stock": self.stock,
        }

class Stock(db.Model):
    """
    Stock Model
    Attributes: ticker, companyName, price, sector, tradescore, investscore, marketcap, company, news
    Relationships: Stock/Article (One To Many), Stock/Company (One To One)
    """
    __tablename__ = 'stock'

    ticker = db.Column(db.String, primary_key = True) # covered by symbol at beginning
    companyName = db.Column(db.String) # covered by iexcloud company
    price = db.Column(db.Float) # covered by iexcloud quote (latestPrice)
    sector = db.Column(db.String) # covered by iexcloud company
    tradescore = db.Column(db.String) # covered by styvio
    investscore = db.Column(db.String) # covered by styvio
    marketcap = db.Column(db.BigInteger) # covered by iexcloud quote

    company = db.relationship('Company', backref = 'company', uselist = False) # one to one
    news = db.relationship('Article', backref = 'stock') # one to many: stock to many news about this stock

    # formatting for json dump
    def format(self):
        return {
            "ticker": self.ticker,
            "company": self.companyName,
            "price": self.price,
            "sector": self.sector,
            "tradescore": self.tradescore,
            "investscore": self.investscore,
            "marketcap": self.marketcap,
        }

# one to many (stock -> news)
class Article(db.Model):
    """
    Article Model
    Attributes: id, headline, datetime (unix epoch), image, source, link, summary, ticker, company
    Relationships: Stock/Article (One To Many)
    """
    __tablename__ = 'article'

    id = db.Column(db.Integer, primary_key = True, autoincrement = "auto") # use number id instead of ticker symbol for URL
    headline = db.Column(db.String) # covered by iexcloud news
    datetime = db.Column(db.BigInteger) # covered by iexcloud news (in unix epoch milliseconds time)
    image = db.Column(db.String) # covered by iexcloud news
    source = db.Column(db.String) # covered by iexcloud news
    link = db.Column(db.String) # covered by iexcloud news
    summary = db.Column(db.String) # covered by iexcloud news
    ticker = db.Column(db.String, db.ForeignKey('stock.ticker')) # access stock ticker through stock
    company = db.Column(db.String)

    # formatting for json dump
    def format(self):
        return {
            "id": self.id,
            "headline": self.headline,
            "datetime": self.datetime,
            "image": self.image,
            "source": self.source,
            "link": self.link,
            "summary": self.summary,
            "ticker": self.ticker,
            "company": self.company,
        }

db.create_all()