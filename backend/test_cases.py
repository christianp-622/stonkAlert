from unittest import main, TestCase
import requests
import json
import app


api_base = "http://localhost:3000/api"
# api_base = "https://stonkalert.me/api"


class python_tests(TestCase):
    # Company API Test


    # Stock API Test 
    stock_response= requests.get("{}/stock".format(api_base))
    stock_json = stock_response.json()

    def test_stock_response(self):
        self.assertEqual(self.article_response.status_code, 200)

    def test_stock_ticker(self):
        self.assertTrue("ticker" in self.stock_json.keys())

    def test_stock_price(self):
        self.assertTrue("price" in self.stock_json.keys())

    def test_stock_sector(self):
        self.assertTrue("sector" in self.stock_json.keys())

    def test_stock_tradescore(self):
        self.assertTrue("tradescore" in self.stock_json.keys())

    def test_stock_investscore(self):
        self.assertTrue("investscore" in self.stock_json.keys())

    def test_stock_marketcap(self):
        self.assertTrue("marketcap" in self.stock_json.keys())


    # Articles API Test
    article_response= requests.get("{}/article".format(api_base))
    article_json = article_response.json()

    def test_article_response(self):
        self.assertEqual(self.article_response.status_code, 200)

    def test_article_id(self):
        self.assertTrue("id" in self.article_json.keys())

    def test_article_headline(self):
        self.assertTrue("headline" in self.article_json.keys())

    def test_article_datetime(self):
        self.assertTrue("datetime" in self.article_json.keys())

    def test_article_source(self):
        self.assertTrue("source" in self.article_json.keys())

    def test_article_link(self):
        self.assertTrue("link" in self.article_json.keys())

    def test_article_summary(self):
        self.assertTrue("summary" in self.article_json.keys())

    def test_article_ticker(self):
        self.assertTrue("ticker" in self.article_json.keys())

