from unittest import main, TestCase
import unittest
import sys
from test_resources.mockdb import db, Company, Stock, Article



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
    
        db.session.query(Article).filter_by(ticker='FAKETICKER').delete()
        db.session.query(Stock).filter_by(ticker = 'FAKETICKER').delete()
        db.session.commit()

        fake_stock = Stock(ticker = "FAKETICKER",companyName = "FAKECOMPANY",price = 9999,sector = "RETAIL",tradescore= "C-",investscore = "A+",marketcap= 185069859711)
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



if __name__ == '__main__':
    main()
    db.drop_all()