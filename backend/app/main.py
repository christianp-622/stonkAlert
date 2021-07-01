from flask import request, render_template
from app import app


@app.route('/', methods=['GET'])
def index():
    if request.method == 'GET':
        return 'Hello World!'
    else:
        return render_template('index.html')

