from flask import Flask, jsonify, request, json
import pymongo
from bson.objectid import ObjectId
from datetime import datetime
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_jwt_extended import create_access_token
from flask_cors import CORS

# Setting up Flask
app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'secret'

# Connecting with Mongo
CONNECTION_STRING = 'mongodb+srv://labslofi:magenta8@lofilabs0-cvfbj.mongodb.net/test?retryWrites=true&w=majority'
mongo = pymongo.MongoClient(CONNECTION_STRING, maxPoolSize=50, connect=False)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
CORS(app)
db = pymongo.database.Database(mongo, 'lofi-labs')


@app.route('/')
def home():
    col = pymongo.collection.Collection(db, 'chords')
    col_results = col.find()
    recent_searches = list(col_results)
    return str(recent_searches[0]['chordProgressions'])


@app.route('/users/register', methods=['POST'])
def register():
    users = pymongo.collection.Collection(db, 'users')
    email = request.get_json()['email']
    password = bcrypt.generate_password_hash(
        request.get_json()['password']).decode('utf-8')
    created = datetime.utcnow()

    user_id = users.insert({
        'email': email,
        "password": password,
        "created": created,
        'favoriteChords': []
    })

    new_user = users.find_one({'_id': user_id})
    result = {'email': new_user['email'] + 'registered'}
    return jsonify({'result': result})


@app.route('/users/login', methods=['POST'])
def login():
    users = pymongo.collection.Collection(db, 'users')
    email = request.get_json()['email']
    password = request.get_json()['password']
    result = ""

    response = users.find_one({'email': email})

    if response:
        if bcrypt.check_password_hash(response['password'], password):
            access_token = create_access_token(identity={
                'email': response['email']
            })
            if('favoriteChords' in response):
                result = jsonify(
                    {"token": access_token, "favoriteChords": response['favoriteChords']})
            else:
                result = jsonify(
                    {"token": access_token, "favoriteChords": []})

        else:
            result = jsonify({"error": "Invalid username and password"})
    else:
        result = jsonify({"result": "No results found"})
    return result

@app.route('/users/favoriteChords', methods=['POST'])
def favoriteChords():
    users = pymongo.collection.Collection(db, 'users')
    chords = request.get_json()['chords']
    email = request.get_json()['email']
    result = ""

    response = users.find_one({'email': email})
    password = response['password']
    created = response['created']
    favorites = response['favoriteChords']
    favorites.append(chords)

    users.update(
        {'email': email}, 
        {
            'favoriteChords': favorites,
            'email': email,
            'password': password,
            'created': created
        }
    )
    return jsonify({"favoriteChords": response['favoriteChords']})

    


if __name__ == '__main__':
    app.run(debug=True)
