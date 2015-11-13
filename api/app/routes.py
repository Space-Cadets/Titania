from flask             import Flask, url_for, jsonify, make_response, request, current_app, Response
from flask_jwt         import JWT, jwt_required, current_identity 
from flask.ext.cors    import CORS
from mongoengine       import *
from bson.json_util    import dumps
from datetime          import timedelta
from functools         import update_wrapper
from werkzeug.security import safe_str_cmp
from app               import app # get app declared in __init__.py

import schema
import os.path
import utils

# User Authentication 

# Review API routes
@app.route('/api/reviews/', methods=['GET'])
def get_reviews():
	return jsonify(response=200)