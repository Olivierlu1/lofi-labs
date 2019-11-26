# Run the following commands in terminal. Make sure you are in the flask_demo folder.
# 1. virtualenv mypython (this create a virtual environment called mypython)
# 2. source mypython/bin/activate (this activates the virtual environment)
# 3. pip install flask (this installs Flask into your virtual environment)
# 4. python main.py (this runs the Flask app)
# It will say where it is running (ex, http://127.0.0.1:5000/) -- put this in your
# web browser where you would put a url to see the web app running locally.

from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("home.html")

@app.route("/about")
def about():
    return "About IE3..."

if __name__ == "__main__":
    app.run(debug=True)