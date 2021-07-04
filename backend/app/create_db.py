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
        news_r = requests.get(IEXCLOUD_URL + 'stable/stock/' + symbol + '/news?token=' + IEXCLOUD_KEY)

        if company_r and stock_r and styvio_r and news_r: # check if json valid request
            add_company(company_r)
            add_stock(company_r, stock_r, styvio_r)
            add_article(news_r)

def add_stock(company_r, stock_r, styvio_r): # method to add stock instance
    # use r.json()['type'] to access company overview elements (ex: r.json()['Description'])
    print(stock_r.json())
    print(styvio_r.json()['invScore'])
    print(styvio_r.json()['tradeScore'])
    # limit calls
    time.sleep(0.05)

def add_company(company_r): # method to add instance of a company
    # use r.json()['type'] to access company overview elements (ex: r.json()['Description'])
    print(company_r.json())
    # limit calls
    time.sleep(0.05)

def add_article(news_r): # method to add article instance
    # use r.json()['type'] to access company overview elements (ex: r.json()['Description'])
    print(news_r.json())
    # limit calls
    time.sleep(0.05)

def create_stonkdb():
    add_all()
    
# uncomment later when db setup
# db.drop_all()
# db.create_all()

create_stonkdb()