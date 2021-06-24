build-host:
	cd stonk-alert && npm run build && cd .. && cd flask-server && python main.py
