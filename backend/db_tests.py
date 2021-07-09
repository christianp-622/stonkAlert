from unittest import main, TestCase
import unittest
import sys
import json
from test_resources.mockdb import db, Company, Stock, Article
from sqlalchemy import desc, exists, case


file = open("test_resources/mockstocks.json")
mock_stocks = json.load(file)
file.close()

file = open("test_resources/mockcompany.json")
mock_companies = json.load(file)
file.close()

file = open("test_resources/mockarticles.json")
mock_articles = json.load(file)
file.close()



def load_db():
    for i in mock_stocks:
        fake_stock = Stock()
        fake_stock.ticker      = i['ticker']
        fake_stock.companyName = i['company']
        fake_stock.price       = i['price']
        fake_stock.sector      = i['sector']
        fake_stock.tradescore  = i['tradescore']
        fake_stock.investscore = i['investscore']
        fake_stock.marketcap   = i['marketcap']
        db.session.add(fake_stock)
    db.session.commit()

    for i in mock_companies:
        fake_company                = Company()
        fake_company.name           = i['name']
        fake_company.country        = i['country']
        fake_company.industry       = i['industry']
        fake_company.exchange       = i['exchange']
        fake_company.logo           = i['logo']
        fake_company.website        = i['website']
        fake_company.description    = i['description']
        stock = Stock.query.filter(Stock.ticker == i['stock']).first()
        stock.company = fake_company
        db.session.add(fake_stock)
    db.session.commit()

    for i in mock_articles:
        fake_article          =  Article()
        fake_article.headline =  i['headline']
        fake_article.company  =  i['company']
        fake_article.datetime =  i['datetime']
        fake_article.image    =  i['image']
        fake_article.source   =  i['source']
        fake_article.link     =  i['link']
        fake_article.summary  =  i['summary']
        stock = stock = Stock.query.filter(Stock.ticker == i['ticker']).first()
        stock.news.append(fake_article)
        db.session.add(fake_article)
    db.session.commit()
def clear_db():
    db.session.query(Company).delete()
    db.session.query(Article).delete()
    db.session.query(Stock).delete()
    db.session.commit()

#db_tests.py contains the unit tests used to test the integrity of the database models and the database itself
class tests(TestCase):

    # the 3 insertion tests inserts a dummy row and ensures that elements are inserted correctly.
    # inserts and then checks the attributes
    # one for each model of the table
    
    # tests the stock model
    def test_insertion_stock (self):

        fake_stock = Stock()
        fake_stock.ticker = "FAKETICKER"
        fake_stock.companyName = "FAKECOMPANY"
        fake_stock.price = 9999
        fake_stock.sector = "RETAIL"
        fake_stock.tradescore= "C-"
        fake_stock.investscore = "A+"
        fake_stock.marketcap= 185069859711
        
        db.session.add(fake_stock)
        db.session.commit()

        stock = db.session.query(Stock).filter_by(ticker = 'FAKETICKER').one()
        self.assertEqual(stock.ticker,      'FAKETICKER')
        self.assertEqual(stock.companyName, 'FAKECOMPANY')
        self.assertEqual(stock.price,        9999)
        self.assertEqual(stock.sector,      "RETAIL")
        self.assertEqual(stock.tradescore,  "C-")
        self.assertEqual(stock.investscore, "A+")
        self.assertEqual(stock.marketcap,   185069859711)

        db.session.query(Stock).filter_by(ticker = 'FAKETICKER').delete()
        db.session.commit()

    #tests the companies model
    def test_insertion_company(self):

        fake_stock = Stock()
        fake_stock.ticker = "FAKETICKER"
        fake_stock.companyName = "FAKECOMPANY"
        fake_stock.price = 9999
        fake_stock.sector = "RETAIL"
        fake_stock.tradescore= "C-"
        fake_stock.investscore = "A+"
        fake_stock.marketcap= 185069859711

        db.session.add(fake_stock)
        db.session.commit()

        stock = Stock.query.filter(Stock.ticker == 'FAKETICKER').first()
        fake_company = Company()
        fake_company.name='FAKECOMPANY'
        fake_company.country= "Antarctica"
        fake_company.industry="COMMUNICATIONS" 
        fake_company.exchange="New York Stock Exchange"
        fake_company.logo="logo.clearbit.com/dogecoin.com"
        fake_company.website = "www.reddit.com/r/wallstreetbets"
        fake_company.description="description text"

        stock.company = fake_company
        db.session.add(fake_company)
        db.session.commit()

        company = db.session.query(Company).filter_by(name = 'FAKECOMPANY').one()
        self.assertEqual(company.name,          'FAKECOMPANY')
        self.assertEqual(company.country,       "Antarctica")
        self.assertEqual(company.industry,      "COMMUNICATIONS")
        self.assertEqual(company.exchange,      "New York Stock Exchange")
        self.assertEqual(company.logo,          "logo.clearbit.com/dogecoin.com")
        self.assertEqual(company.website,       "www.reddit.com/r/wallstreetbets")
        self.assertEqual(company.description,   "description text")


        db.session.query(Company).filter_by(name = 'FAKECOMPANY').delete()
        db.session.query(Stock).filter_by(ticker = 'FAKETICKER').delete()
        db.session.commit() 


    #tests the articles model
    def test_insertion_article(self):

        fake_stock = Stock()
        fake_stock.ticker = "FAKETICKER"
        fake_stock.companyName = "FAKECOMPANY"
        fake_stock.price = 9999
        fake_stock.sector = "RETAIL"
        fake_stock.tradescore= "C-"
        fake_stock.investscore = "A+"
        fake_stock.marketcap= 185069859711

        db.session.add(fake_stock)
        db.session.commit()


        fake_article = Article()
        fake_article.headline = "Sample news headline"
        fake_article.company  = "FAKECOMPANY"
        fake_article.datetime =  1625084220000
        fake_article.image    = "https://i.kym-cdn.com/photos/images/newsfeed/001/499/826/2f0.png"
        fake_article.source   = "r/investing"
        fake_article.link     = "www.reddit.com/r/investing"
        fake_article.summary  = "article summary text here"
        fake_stock.news.append(fake_article)

        db.session.add(fake_article)
        db.session.commit()
        article = db.session.query(Article).filter_by(ticker='FAKETICKER').one()
        self.assertEqual(article.headline,  "Sample news headline")
        self.assertEqual(article.company,   "FAKECOMPANY")
        self.assertEqual(article.datetime,   1625084220000)
        self.assertEqual(article.image,     "https://i.kym-cdn.com/photos/images/newsfeed/001/499/826/2f0.png")
        self.assertEqual(article.source,    "r/investing")
        self.assertEqual(article.link,      "www.reddit.com/r/investing")
        self.assertEqual(article.summary,   "article summary text here")

        db.session.query(Article).filter_by(ticker='FAKETICKER').delete()
        db.session.query(Stock).filter_by(ticker = 'FAKETICKER').delete()
        db.session.commit()


    # tests the sorting of stocks
    def test_sort_stock(self):
        stock = db.session.query(Stock).order_by(desc('price')).first()
        self.assertEqual(stock.ticker, "GME")
        stock = db.session.query(Stock).order_by('price').first()
        self.assertEqual(stock.ticker, 'BB')
        stock = db.session.query(Stock).order_by(desc('ticker')).first()
        self.assertEqual(stock.ticker, "GME")
        stock = db.session.query(Stock).order_by('ticker').first()
        self.assertEqual(stock.ticker, 'AMC')
    
    # tests the sorting of companies
    def test_sort_company(self):
        company = db.session.query(Company).order_by(desc('stock')).first()
        self.assertEqual(company.stock, "GME")
        company = db.session.query(Company).order_by('stock').first()
        self.assertEqual(company.stock, "AMC")

    # tests the sort of articles
    def test_sort_article(self):
        article = db.session.query(Article).order_by('datetime').first()
        self.assertEqual(article.ticker,'GME')
        self.assertEqual(article.datetime, 162577679000)
        article = db.session.query(Article).order_by(desc('datetime')).first()
        self.assertEqual(article.ticker,'BB')
        self.assertEqual(article.datetime, 16257604780000)




if __name__ == '__main__':

    clear_db()
    load_db()
    main()
    
    db.drop_all()