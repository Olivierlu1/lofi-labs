from flask import Flask
import pymongo

#Setting up Flask
app = Flask(__name__)

# Connecting with Mongo
CONNECTION_STRING = 'mongodb+srv://labslofi:magenta8@lofilabs0-cvfbj.mongodb.net/test?retryWrites=true&w=majority'
mongo = pymongo.MongoClient(CONNECTION_STRING, maxPoolSize=50, connect=False)
db = pymongo.database.Database(mongo, 'lofi-labs')
col = pymongo.collection.Collection(db, 'chords')


@app.route('/')
def home():
	col_results = col.find()
	recent_searches=list(col_results)
	return str(recent_searches[0]['chordProgressions'])
