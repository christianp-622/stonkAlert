deploy-backend:
	cd backend && pip3 install -r requirements.txt && python3 run.py

deploy-frontend:
	cd frontend && npm install && npm start

unit_tests:
	python3 backend/app/tests.py

