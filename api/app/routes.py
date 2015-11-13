from flask             import Flask, url_for, jsonify, make_response, request, current_app, Response
from flask_jwt         import JWT, jwt_required, current_identity 
from flask.ext.cors    import CORS
from mongoengine       import *
from bson.json_util    import dumps
from datetime          import timedelta
from functools         import update_wrapper
from werkzeug.security import safe_str_cmp
from app               import app                    

import schema
import os.path
import utils
import auth

class User(object):
    def __init__(self, id, username, password):
        self.id = id
        self.username = username
        self.password = password

    def __str__(self):
        return "User(id='%s')" % self.id

# (TODO) Replace with real user database connection
users = [
    User(1, 'user1', 'abcxyz'),
    User(2, 'user2', 'abcxyz'),
]

username_table = {u.username: u for u in users}
userid_table =   {u.id:       u for u in users}

def authenticate(username, password):
    user = username_table.get(username, None)
    if user and safe_str_cmp(user.password.encode('utf-8'), password.encode('utf-8')):
        return user

def identity(payload):
    user_id = payload['identity']
    return userid_table.get(user_id, None)

app = Flask(__name__)
app.debug = True
app.config['SECRET_KEY'] = 'super-secret'

jwt = JWT(app, authenticate, identity)

@app.route('/protected')
@jwt_required()
def protected():
    return '%s' % current_identity


# Review API routes
@app.route('/api/reviews/', methods=['GET'])
def get_reviews():
	return jsonify(response=200)

@app.route('/api/reviews')
def hello():
	return 1