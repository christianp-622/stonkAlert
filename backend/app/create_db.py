import os
import requests
import time
import json
from app import app
from .models import db, Stock, Company, Article

IEXCLOUD_URL = "https://cloud.iexapis.com/" # https://cloud.iexapis.com/stable/stock/{ticker lowercase}}/news?token={api key}
STYVIO_URL = "https://www.styvio.com/api/" # https://www.styvio.com/api/{ticker}
FINNHUB_URL = "https://finnhub.io/api/v1/" # https://finnhub.io/api/v1/stock/symbol?exchange=US&token={api key}

IEXCLOUD_KEY = os.environ.get("IEXCLOUD_KEY")
FINNHUB_KEY = os.environ.get("FINNHUB_KEY")

# request to get json of all stocks using Finnhub (4000+ stocks in US)
r = requests.get(FINNHUB_URL + 'stock/symbol?exchange=US&mic=XNYS&token=' + FINNHUB_KEY)
stocks = r.json()

def add_all(): # method to add all stocks, companies, and news instances for each stock in finnhub list of stocks
    num = 0
    for stock in stocks:
        if num == 10:
            break
        symbol = stock['symbol']
        company_r = requests.get(IEXCLOUD_URL + 'stable/stock/' + symbol + '/company?token=' + IEXCLOUD_KEY)
        stock_r = requests.get(IEXCLOUD_URL + 'stable/stock/' + symbol + '/quote?token=' + IEXCLOUD_KEY)
        styvio_r = requests.get(STYVIO_URL + symbol)
        news_r = requests.get(IEXCLOUD_URL + 'stable/stock/' + symbol + '/news/last/3?token=' + IEXCLOUD_KEY) # arbitrary limit to 3 per stock so we don't burn our api credits -guan
        if company_r and stock_r and styvio_r and news_r: # check if json valid request
            add_stock(company_r, stock_r, styvio_r)
            add_article(news_r, symbol)
            add_company(company_r)
        num += 1
            
def add_stock(company_r, stock_r, styvio_r): # method to add stock instance
    # use r.json()['type'] to access company overview elements (ex: r.json()['Description'])
    # test prints
    # print(stock_r.json())
    # print(styvio_r.json()['invScore'])
    # print(styvio_r.json()['tradeScore'])

    # creating instance
    stock = Stock()
    stock.ticker = stock_r.json()['symbol']
    stock.price = stock_r.json()['latestPrice']
    stock.sector = company_r.json()['sector']
    if stock.sector == "" or stock.sector is None:
        stock.sector = "Miscellaneous"
    stock.tradescore = styvio_r.json()['tradeScore']
    stock.investscore = styvio_r.json()['invScore']
    stock.marketcap = stock_r.json()['marketCap']
    if stock.marketcap is None:
        stock.marketcap = 0

    db.session.add(stock)
    db.session.commit()

    # limit calls
    time.sleep(0.05)

def add_company(company_r): # method to add instance of a company
    # use r.json()['type'] to access company overview elements (ex: r.json()['Description'])
    # test prints
    # print(company_r.json())

    # creating instance
    company = Company()
    company.name = company_r.json()['companyName']
    company.country = company_r.json()['country']
    if not company.country:
        company.country = "US"
    company.industry = company_r.json()['industry']
    if company.industry == "":
        company.industry = "Miscellaneous"
    company.exchange = company_r.json()['exchange']
    company.website = company_r.json()['website']
    if company.website == "":
        company.website = "https://www.google.com/search?q=" + company.name
    company.description = company_r.json()['description']
    if company.description == "":
        company.description = "No description available."

    # linking one to one
    stock = Stock.query.filter(Stock.ticker == company_r.json()['symbol']).first()
    stock.company = company
    # company.stock = stock.ticker # might not need bc linked through foreign key

    db.session.add(company)
    db.session.commit()

    # limit calls
    time.sleep(0.05)

def add_article(news_r, symbol): # method to add article instance
    # news_r is an list of news articles, each element being a unique article.
    # use r.json()[index]['type'] to access individual articles elements (ex: r.json()[0]['headline'])
    # test prints
    # print(news_r.json())

    stock = Stock.query.filter(Stock.ticker == symbol).first()

    #go through the list of news and create an article instance for each
    for news in news_r.json():
        article = Article()
        article.headline = news['headline']
        article.datetime = news['datetime']
        article.source   = news['source']
        article.link     = news['url']
        article.summary  = news['summary']

        # linking: many articles to one stock
        stock.news.append(article)
        # article.stock = stock.ticker # might not need bc linked through foreign key

        db.session.add(article)
        db.session.commit()
    
    # limit calls
    time.sleep(0.05)

def create_stonkdb():
    add_all()
    db.session.commit()
    
# uncomment later when db setup
db.drop_all()
db.create_all()  

create_stonkdb()