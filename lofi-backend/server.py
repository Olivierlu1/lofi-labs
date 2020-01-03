from flask import Flask
app = Flask(__name__)

@app.route('/')
def placeholder():
	return 'API for Lofi Labs'
