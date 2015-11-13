from flask import Flask
from flask_jwt import JWT, jwt_required, current_identity # Add this
from werkzeug.security import safe_str_cmp                # add this if not
from app import app

class User(object):
    def __init__(self, id, username, password):
        self.id = id
        self.username = username
        self.password = password

    def __str__(self):
        return "User(id='%s')" % self.id

users = [
    User(1, 'user1', 'abcxyz'),
    User(2, 'user2', 'abcxyz'),
]

username_table = {u.username: u for u in users}
userid_table   = {u.id: u for u in users}

def authenticate(username, password):
    user = username_table.get(username, None)

    if user and safe_str_cmp(user.password.encode('utf-8'), password.encode('utf-8')):
        return user

def identity(payload):
    user_id = payload['identity']
    print user_id
    return userid_table.get(user_id, None)


jwt = JWT(app, authenticate, identity)

@app.route('/protected')
@jwt_required()
def protected():
    return '%s' % current_identity

# To Test via curl
# curl -H "Content-Type: application/json" -X POST -d '{"username":"user1","password":"abcxyz"}' http://localhost:5000/auth
# To get via curl