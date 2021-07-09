output-tests:
	coverage run --branch app/tests.py > output.txt 2>&1 && coverage report -m >> output.txt


database-tests:
	coverage run --branch db_tests.py > db_output.txt 2>&1 && coverage report -m db_tests.py >> db_output.txt


postman-tests:
	npm install -g newman && newman run Postman_Tests.json