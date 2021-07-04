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

# load all nyse stocks
f = open('data/nyse_stocks.json',)  
stocks = json.load(f)

# request alternative to get json of all stocks
# r = requests.get(FINNHUB_URL + 'stock/symbol?exchange=US&mic=XNYS&token=' + FINNHUB_KEY)

# get list of all US stocks from Finnhub, then for each stock call apis to get information about company, stock, and articles about those stocks.
def add_all(): # method to add all stocks, companies, and news. will call and loop through finnhub stocks response and add stock/company/news instances for each ticker from finnhub
    print()

def add_stock(finnhub_price_r): # method to add stock instance
    # use r.json()['type'] to access company overview elements (ex: r.json()['Description'])
    print(finnhub_price_r.json())
    # limit calls (~30 per second but 60 per minute)
    time.sleep(1)

def add_stocks(): # method to add all stock instances, has a problem with freezing up
    for stock in stocks:
        symbol = stock['symbol']
        finnhub_price_r = requests.get(FINNHUB_URL + 'quote?symbol=' + symbol + '&token=' + FINNHUB_KEY)
        if (finnhub_price_r):
            add_stock(finnhub_price_r)

def add_company(finnhub_overview_r): # method to add instance of a company
    # use r.json()['type'] to access company overview elements (ex: r.json()['Description'])
    print(finnhub_overview_r.json())
    # limit calls (~30 per second but 60 per minute)
    time.sleep(1)

def add_companies():
    for stock in stocks:
        symbol = stock['symbol']
        finnhub_overview_r = requests.get(FINNHUB_URL + 'stock/profile2?symbol=' + symbol + '&token=' + FINNHUB_KEY)
        if (finnhub_overview_r and finnhub_overview_r.json()):
            add_company(finnhub_overview_r)

def add_article(iexcloud_r): # method to add article instance
    # use r.json()['type'] to access company overview elements (ex: r.json()['Description'])
    print(iexcloud_r.json())
    # limit calls (~30 per second but 60 per minute)
    time.sleep(1)

def add_news(): # method to add all news/articles instances
    for stock in stocks:
        symbol = stock['symbol']
        iexcloud_r = requests.get(IEXCLOUD_URL + 'stable/stock/' + symbol + '/news?token=' + IEXCLOUD_KEY)
        if (iexcloud_r and iexcloud_r.json()):
            add_article(iexcloud_r)

def create_stonkdb():
    add_companies()
    add_news()
    add_stocks()

# uncomment later when db setup
# db.drop_all()
# db.create_all()

create_stonkdb()