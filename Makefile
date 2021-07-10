deploy-backend-local:
	cd backend && pip3 install -r requirements.txt && python3 run.py

deploy-frontend-local:
	cd frontend && npm install && npm start

output-tests:
	cd backend && make output-tests

database-tests:
	cd backend && make database-tests

postman-tests:
	cd backend && make postman-tests
