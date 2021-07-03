import os
from models import app, db, Stock, Company, Article

ALPHA_VANTAGE_URL = "https://www.alphavantage.co/" # https://www.alphavantage.co/query?function=OVERVIEW&symbol={TICKER}&apikey={key}
IEXCLOUD_URL = "https://cloud.iexapis.com/" # https://cloud.iexapis.com/stable/stock/{ticker lowercase}}/news?token={api key}
STYVIO_URL = "https://www.styvio.com/api/" # https://www.styvio.com/api/{ticker}
FINNHUB_URL = "https://finnhub.io/api/v1/stock/symbol?exchange=US&token=" # https://finnhub.io/api/v1/stock/symbol?exchange=US&token={api key}

ALPHA_VANTAGE_KEY = os.environ.get("ALPHA_VANTAGE_KEY")
IEXCLOUD_KEY = os.environ.get("IEXCLOUD_KEY")
FINNHUB_KEY = os.environ.get("FINNHUB_KEY")

# get list of all US stocks from Finnhub, then for each stock call alpha vantage/styvio/iexcloud api to get information about company, stock, and articles about those stocks.

# def add_all(): # method to add all stocks, companies, and news. will call and loop through finnhub stocks response and add stock/company/news instances for each ticker from finnhub

# def add_stock(): # method to add instance of a stock from stock ticker

# def add_companies(): # method to add companies from stock ticker

# def add_news(): # method to add news instances of the stock ticker

# def create_stonkdb():
    # add_all()

# db.drop_all()
# db.create_all()

# create_stonkdb()