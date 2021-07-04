import os
import requests
import time
import json
from models import app, db, Stock, Company, Article

IEXCLOUD_URL = "https://cloud.iexapis.com/" # https://cloud.iexapis.com/stable/stock/{ticker lowercase}}/news?token={api key}
STYVIO_URL = "https://www.styvio.com/api/" # https://www.styvio.com/api/{ticker}
FINNHUB_URL = "https://finnhub.io/api/v1/" # https://finnhub.io/api/v1/stock/symbol?exchange=US&token={api key}

IEXCLOUD_KEY = os.environ.get("IEXCLOUD_KEY")
FINNHUB_KEY = os.environ.get("FINNHUB_KEY")

# request to get json of all stocks using Finnhub (4000+ stocks in US)
r = requests.get(FINNHUB_URL + 'stock/symbol?exchange=US&mic=XNYS&token=' + FINNHUB_KEY)
stocks = r.json()

def add_all(): # method to add all stocks, companies, and news instances for each stock in finnhub list of stocks
    for stock in stocks:
        symbol = stock['symbol']
        company_r = requests.get(IEXCLOUD_URL + 'stable/stock/' + symbol + '/company?token=' + IEXCLOUD_KEY)
        stock_r = requests.get(IEXCLOUD_URL + 'stable/stock/' + symbol + '/quote?token=' + IEXCLOUD_KEY)
        styvio_r = requests.get(STYVIO_URL + symbol)
        news_r = requests.get(IEXCLOUD_URL + 'stable/stock/' + symbol + '/news/last/3?token=' + IEXCLOUD_KEY) # arbitrary limit to 3 per stock so we don't burn our api credits -guan
        if company_r and stock_r and styvio_r and news_r: # check if json valid request
            add_article(news_r)
            add_company(company_r)
            add_stock(company_r, stock_r, styvio_r)
            
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
    stock.tradescore = styvio_r.json()['tradeScore']
    stock.investscore = styvio_r.json()['invScore']
    stock.volume = stock_r.json()['volume']

    # 1:1 relationship link with company
    # company = Company.query.filter(Company.stock == company_r.json()['symbol']).first()
    # stock.company = company.stock
    # stock.news

    # news = Article.query.get(stock.ticker)


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
    company.ceo = company_r.json()['CEO']
    company.industry = company_r.json()['industry']
    company.employees = company_r.json()['employees']
    company.website = company_r.json()['website']
    company.description = company_r.json()['description']

    # linking
    # company.stock = company_r.json()['symbol']

    db.session.add(company)
    db.session.commit()

    # limit calls
    time.sleep(0.05)

def add_article(news_r): # method to add article instance
    # news_r is an list of news articles, each element being a unique article.
    # use r.json()[index]['type'] to access individual articles elements (ex: r.json()[0]['headline'])
    # test prints
    # print(news_r.json())

    #go through the list of news and create an article instance for each
    for news in news_r.json():
        article = Article()
        article.headline = news['headline']
        article.datetime = news['datetime']
        article.source   = news['source']
        article.link     = news['url']
        article.summary  = news['summary']
        db.session.add(article)
        db.session.commit()

    # many to 1 relationship with stock (stock -> news about this stock)
    # article.ticker = ??
    # article.company = ??
    
    # limit calls
    time.sleep(0.05)

def create_stonkdb():
    add_all()
    db.session.commit()
    
# uncomment later when db setup
db.drop_all()
db.create_all()  

create_stonkdb()