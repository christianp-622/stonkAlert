from unittest import main, TestCase
import unittest
import requests
import json

api_base = "http://127.0.0.1:5000/api"
# api_base = "http://stonkalert.me/api"


class tests(TestCase):
    # Company Model API Test
    company_response= requests.get("{}/company?symbol=WWW".format(api_base))
    company_json = company_response.json()

    # test response of get request for the Company model 
    def test_company_response(self):
        self.assertEqual(self.company_response.status_code, 200)

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

    # test multiple company instances 
    # do this for a limit of 25 companies
    def test_multiple_company_instances(self):
        company_attributes = ["name", "country", "industry", "exchange", 
                              "logo", "website", "description", "stock"]

        # sort based on all atribute input
        for atr in company_attributes:
            url = ("{}/companies?sort=" + atr + "&asc=True&limit=25").format(api_base)

            companies_response = requests.get(url) 
            self.assertEqual(companies_response.status_code, 200)
            
            companies_json = companies_response.json()

            # limit of 25 companies
            for i in range(len(companies_json)):
                this_company = companies_json[i]

                for val in company_attributes:
                    self.assertTrue(val in this_company.keys())

                self.assertTrue(isinstance(this_company.get("name"), str))
                self.assertTrue(isinstance(this_company.get("logo"), str))
                self.assertTrue(isinstance(this_company.get("country"), str))
                self.assertTrue(isinstance(this_company.get("website"), str))
                self.assertTrue(isinstance(this_company.get("industry"), str))
                self.assertTrue(isinstance(this_company.get("description"), str))
                self.assertTrue(isinstance(this_company.get("exchange"), str))
                self.assertTrue(isinstance(this_company.get("stock"), str))

    # # Stock Model API Test 
    stock_response = requests.get("{}/stock?symbol=WWW".format(api_base))
    stock_json = stock_response.json()

    # test response of get request for Stock model
    def test_stock_response(self):
        self.assertEqual(self.stock_response.status_code, 200)

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


    # test multiple stock instances 
    # do this for a limit of 25 stock
    def test_multiple_stock_instances(self):
        stock_attributes = ["ticker", "company", "price", "sector", 
                              "tradescore", "investscore", "marketcap"]

        for atr in stock_attributes:
            url = ("{}/stocks?sort=" + atr + "&asc=True&limit=25").format(api_base)

            stock_response = requests.get(url) 
            self.assertEqual(stock_response.status_code, 200)
            
            stock_json = stock_response.json()

            # limit of 25 stock
            for i in range(len(stock_json)):
                this_stock = stock_json[i]

                for val in stock_attributes:
                    self.assertTrue(val in this_stock.keys())

                self.assertTrue(isinstance(this_stock.get("ticker"), str))
                self.assertTrue(isinstance(this_stock.get("company"), str))
                self.assertTrue(isinstance(this_stock.get("price"), float))
                self.assertTrue(isinstance(this_stock.get("sector"), str))
                self.assertTrue(isinstance(this_stock.get("tradescore"), str))
                self.assertTrue(isinstance(this_stock.get("investscore"), str))
                self.assertTrue(isinstance(this_stock.get("marketcap"), int))


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
    def test_article_company(self):
        self.assertTrue("company" in self.article_json.keys())
        self.assertTrue(isinstance(self.article_json.get("company"), str))


    # test multiple article instances 
    # do this for a limit of 25 news articles
    def test_multiple_article_instances(self):
        article_attributes = ["id", "headline", "datetime", 
                              "image", "source", "link", 
                              "summary", "ticker", "company"]

        for atr in article_attributes:
            url = ("{}/news?sort=" + atr + "&asc=True&limit=25").format(api_base)

            article_response = requests.get(url)
            self.assertEqual(article_response.status_code, 200)
            
            article_json = article_response.json()

            # limit of 25 news articles
            for i in range(len(article_json)):
                this_article = article_json[i]

                for val in article_attributes:
                    self.assertTrue(val in this_article.keys())

                self.assertTrue(isinstance(this_article.get("id"), int))
                self.assertTrue(isinstance(this_article.get("headline"), str))
                self.assertTrue(isinstance(this_article.get("datetime"), int))
                self.assertTrue(isinstance(this_article.get("image"), str))
                self.assertTrue(isinstance(this_article.get("source"), str))
                self.assertTrue(isinstance(this_article.get("link"), str))
                self.assertTrue(isinstance(this_article.get("summary"), str))
                self.assertTrue(isinstance(this_article.get("ticker"), str))
                self.assertTrue(isinstance(this_article.get("company"), str))


if __name__ =="__main__":
    main()
    # output = 'output.txt'
    # with open(output, "w") as f:
    #    runner = unittest.TextTestRunner(f)
    #    unittest.main(testRunner=runner) # allows to run file as "python tests.py"
