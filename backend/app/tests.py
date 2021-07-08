from unittest import main, TestCase
import unittest
import requests
import json


api_base = "http://127.0.0.1:5000/api"
# api_base = "https://stonkalert.me/api"


class tests(TestCase):
    # Company Model API Test
    company_response= requests.get("{}/company?symbol=AMC".format(api_base))
    company_json = company_response.json()

    # test response of get request for the Company model 
    def test_company_response(self):
        self.assertEqual(self.article_response.status_code, 200)

    # test name attribute of Company model
    def test_company_name(self):
        self.assertTrue("name" in self.company_json.keys())
        self.assertTrue(isinstance(self.company_json.get("name"), str))

    # test country attribute of Company model
    def test_company_country(self):
        self.assertTrue("country" in self.company_json.keys())
        self.assertTrue(isinstance(self.company_json.get("country"), str))

    # test industry attribute of Company model
    def test_company_industry(self):
        self.assertTrue("industry" in self.company_json.keys())
        self.assertTrue(isinstance(self.company_json.get("industry"), str))

    # test exchange attribute of Company model
    def test_company_exchange(self):
        self.assertTrue("exchange" in self.company_json.keys())
        self.assertTrue(isinstance(self.company_json.get("exchange"), str))

    # test logo attribute of Company model
    def test_company_logo(self):
        self.assertTrue("logo" in self.company_json.keys())
        self.assertTrue(isinstance(self.company_json.get("logo"), str))

    # test website attribute of Company model
    def test_company_website(self):
        self.assertTrue("website" in self.company_json.keys())
        self.assertTrue(isinstance(self.company_json.get("website"), str))

    # test description attribute of Company model
    def test_company_description(self):
        self.assertTrue("description" in self.company_json.keys())
        self.assertTrue(isinstance(self.company_json.get("description"), str))

    # test stock attribute of Company model, and the stock's attributes
    def test_company_stock(self):
        self.assertTrue("stock" in self.company_json.keys())
        self.assertTrue(isinstance(self.company_json.get("stock"), str))
        
        stock = self.company_json.get("stock")
        self.assertTrue("ticker" in stock.keys())
        self.assertTrue(isinstance(stock.get("ticker"), str))

        self.assertTrue("company" in stock.keys())
        self.assertTrue(isinstance(stock.get("company"), str))

        self.assertTrue("price" in stock.keys())
        self.assertTrue(isinstance(stock.get("price"), float))

        self.assertTrue("sector" in stock.keys())
        self.assertTrue(isinstance(stock.get("sector"), str))

        self.assertTrue("tradescore" in stock.keys())
        self.assertTrue(isinstance(stock.get("tradescore"), str))

        self.assertTrue("marketcap" in stock.keys())
        self.assertTrue(isinstance(stock.get("marketcap"), int))



    # Stock Model API Test 
    stock_response= requests.get("{}/stock?symbol=AMC".format(api_base))
    stock_json = stock_response.json()

    # test response of get request for Stock model
    def test_stock_response(self):
        self.assertEqual(self.article_response.status_code, 200)

    # test ticker attribute of Stock model
    def test_stock_ticker(self):
        self.assertTrue("ticker" in self.stock_json.keys())
        self.assertTrue(isinstance(self.stock_json.get("ticker"), str))
    
    # test company attribute of Stock model
    def test_stock_company(self):
        self.assertTrue("company" in self.stock_json.keys())
        self.assertTrue(isinstance(self.stock_json.get("company"), str))

    # test price attribute of Stock model
    def test_stock_price(self):
        self.assertTrue("price" in self.stock_json.keys())
        self.assertTrue(isinstance(self.stock_json.get("price"), float))

    # test sector attribute of Stock model
    def test_stock_sector(self):
        self.assertTrue("sector" in self.stock_json.keys())
        self.assertTrue(isinstance(self.stock_json.get("sector"), str))

    # test tradescore attribute of Stock model
    def test_stock_tradescore(self):
        self.assertTrue("tradescore" in self.stock_json.keys())
        self.assertTrue(isinstance(self.stock_json.get("tradescore"), str))

    # test investscore attribute of Stock model
    def test_stock_investscore(self):
        self.assertTrue("investscore" in self.stock_json.keys())
        self.assertTrue(isinstance(self.stock_json.get("investscore"), str))

    # test marketcap attribute of Stock model
    def test_stock_marketcap(self):
        self.assertTrue("marketcap" in self.stock_json.keys())
        self.assertTrue(isinstance(self.stock_json.get("marketcap"), int))



    # Articles Model API Test
    article_response= requests.get("{}/article?id=1".format(api_base))
    article_json = article_response.json()

    # test response of get request for Article model
    def test_article_response(self):
        self.assertEqual(self.article_response.status_code, 200)

    # test id attribute of Article model
    def test_article_id(self):
        self.assertTrue("id" in self.article_json.keys())
        self.assertTrue(isinstance(self.article_json.get("id"), int))

    # test headline attribute of Article model
    def test_article_headline(self):
        self.assertTrue("headline" in self.article_json.keys())
        self.assertTrue(isinstance(self.article_json.get("headline"), str))

    # test datetime attribute of Article model
    def test_article_datetime(self):
        self.assertTrue("datetime" in self.article_json.keys())
        self.assertTrue(isinstance(self.article_json.get("datetime"), int))

    # test image attribute of Article model
    def test_article_image(self):
        self.assertTrue("image" in self.article_json.keys())
        self.assertTrue(isinstance(self.article_json.get("image"), str))

    # test source attribute of Article model
    def test_article_source(self):
        self.assertTrue("source" in self.article_json.keys())
        self.assertTrue(isinstance(self.article_json.get("source"), str))

    # test link attribute of Article model
    def test_article_link(self):
        self.assertTrue("link" in self.article_json.keys())
        self.assertTrue(isinstance(self.article_json.get("link"), str))

    # test summary attribute of Article model
    def test_article_summary(self):
        self.assertTrue("summary" in self.article_json.keys())
        self.assertTrue(isinstance(self.article_json.get("summary"), str))

    # test ticker attribute of Article model
    def test_article_ticker(self):
        self.assertTrue("ticker" in self.article_json.keys())
        self.assertTrue(isinstance(self.article_json.get("ticker"), str))
    
    # test company attribute of Article model
    def test_article_ticker(self):
        self.assertTrue("company" in self.article_json.keys())
        self.assertTrue(isinstance(self.stock_json.get("company"), str))



if __name__ =="__main__":
    # main()
    output = 'output.txt'
    with open(output, "w") as f:
       runner = unittest.TextTestRunner(f)
       unittest.main(testRunner=runner) # allows to run file as "python tests.py"
