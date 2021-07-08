from unittest import main, TestCase
import unittest
import requests
import json


api_base = "http://127.0.0.1:5000/api"
# api_base = "https://stonkalert.me/api"


class tests(TestCase):
    # Company Model API Test
    # company_response= requests.get("{}/company".format(api_base))
    # company_json = company_response.json()

    # # test response of get request for the Company model 
    # def test_company_response(self):
    #     self.assertEqual(self.article_response.status_code, 200)

    # # test name attribute of Company model
    # def test_company_name(self):
    #     self.assertTrue("name" in self.company_json.keys())
    #     self.assertGreater(len(self.company_json.get("name")), 0)

    # # test country attribute of Company model
    # def test_company_country(self):
    #     self.assertTrue("country" in self.company_json.keys())
    #     self.assertGreater(len(self.company_json.get("country")), 0)

    # # test industry attribute of Company model
    # def test_company_industry(self):
    #     self.assertTrue("industry" in self.company_json.keys())
    #     self.assertGreater(len(self.company_json.get("industry")), 0)

    # # test exchange attribute of Company model
    # def test_company_exchange(self):
    #     self.assertTrue("exchange" in self.company_json.keys())
    #     self.assertGreater(len(self.company_json.get("exchange")), 0)

    # # test logo attribute of Company model
    # def test_company_logo(self):
    #     self.assertTrue("logo" in self.company_json.keys())
    #     self.assertGreater(len(self.company_json.get("logo")), 0)

    # # test website attribute of Company model
    # def test_company_website(self):
    #     self.assertTrue("website" in self.company_json.keys())
    #     self.assertGreater(len(self.company_json.get("website")), 0)

    # # test description attribute of Company model
    # def test_company_description(self):
    #     self.assertTrue("description" in self.company_json.keys())
    #     self.assertGreater(len(self.company_json.get("description")), 0)

    # # test stock attribute of Company model, and the stock's attributes
    # def test_company_stock(self):
    #     self.assertTrue("stock" in self.company_json.keys())
        
    #     stock = self.company_json.get("stock")
    #     self.assertTrue("ticker" in stock.keys())
    #     self.assertTrue("company" in stock.keys())
    #     self.assertTrue("price" in stock.keys())
    #     self.assertTrue("sector" in stock.keys())
    #     self.assertTrue("tradescore" in stock.keys())
    #     self.assertTrue("marketcap" in stock.keys())



    # # Stock Model API Test 
    # stock_response= requests.get("{}/stock".format(api_base))
    # stock_json = stock_response.json()

    # # test response of get request for Stock model
    # def test_stock_response(self):
    #     self.assertEqual(self.article_response.status_code, 200)

    # # test ticker attribute of Stock model
    # def test_stock_ticker(self):
    #     self.assertTrue("ticker" in self.stock_json.keys())
    
    # # test company attribute of Stock model
    # def test_stock_company(self):
    #     self.assertTrue("company" in self.stock_json.keys())

    # # test price attribute of Stock model
    # def test_stock_price(self):
    #     self.assertTrue("price" in self.stock_json.keys())

    # # test sector attribute of Stock model
    # def test_stock_sector(self):
    #     self.assertTrue("sector" in self.stock_json.keys())

    # # test tradescore attribute of Stock model
    # def test_stock_tradescore(self):
    #     self.assertTrue("tradescore" in self.stock_json.keys())

    # # test investscore attribute of Stock model
    # def test_stock_investscore(self):
    #     self.assertTrue("investscore" in self.stock_json.keys())

    # # test marketcap attribute of Stock model
    # def test_stock_marketcap(self):
    #     self.assertTrue("marketcap" in self.stock_json.keys())



    # Articles Model API Test
    article_response= requests.get("{}/article?id=1".format(api_base))
    article_json = article_response.json()

    # test response of get request for Article model
    def test_article_response(self):
        self.assertEqual(self.article_response.status_code, 200)

    # test id attribute of Article model
    def test_article_id(self):
        self.assertTrue("id" in self.article_json.keys())

    # test headline attribute of Article model
    def test_article_headline(self):
        self.assertTrue("headline" in self.article_json.keys())

    # test datetime attribute of Article model
    def test_article_datetime(self):
        self.assertTrue("datetime" in self.article_json.keys())

    # test image attribute of Article model
    def test_article_image(self):
        self.assertTrue("image" in self.article_json.keys())

    # test source attribute of Article model
    def test_article_source(self):
        self.assertTrue("source" in self.article_json.keys())

    # test link attribute of Article model
    def test_article_link(self):
        self.assertTrue("link" in self.article_json.keys())

    # test summary attribute of Article model
    def test_article_summary(self):
        self.assertTrue("summary" in self.article_json.keys())

    # test ticker attribute of Article model
    def test_article_ticker(self):
        self.assertTrue("ticker" in self.article_json.keys())
    
    # test company attribute of Article model
    def test_article_ticker(self):
        self.assertTrue("company" in self.article_json.keys())



if __name__ =="__main__":
    # main()
    output = 'output.txt'
    with open(output, "w") as f:
       runner = unittest.TextTestRunner(f)
       unittest.main(testRunner=runner) # allows to run file as "python tests.py"
