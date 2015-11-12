from flask             import Flask, url_for, jsonify, make_response, request, current_app, Response
from flask.ext.cors    import CORS
from flask.ext.restful import Api, Resource, fields, marshal, reqparse
from pymongo           import MongoClient
from mongoengine       import *
from bson.json_util    import dumps
from datetime          import timedelta
from functools         import update_wrapper
from werkzeug.security import safe_str_cmp

import schema
import os.path
import config                    # secrets live here (Create a config.py file)

secret  = config.Config.MONGO_URI # Config should never be pushed to git repo
mclient = MongoClient(secret)
db      = mclient.novacourses
reviews = db.novateachers

app  = Flask(__name__)
cors = CORS(app, resources={r"/foo": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'
api  = Api(app)

class UserAPI(Resource):
    def get(self):
        pass

    def put(self):
        pass

    def post(self):
        pass

class ReviewAPI(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('instructor', required=True, type=str, location='json')
        super(ReviewAPI, self).__init__()

    def get(self, review_id):
        review = db.novateachers.find({'review_id': review_id})
        return output_json(review, 200)

    def put(self, review_id):
        args = self.reqparse.parse_args()
        # print
        return output_json("To Implement", 200)

    def post(self, review_id):
        args = self.reqparse.parse_args()
        print args['instructor']
        return output_json("HI", 200)

class ReviewListAPI(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('instructor', type = str, default = None)
        self.reqparse.add_argument('course-num', type = str, default = None)

    def get(self):
        args = self.reqparse.parse_args()
        instructor = args['instructor']
        course_num = args['course-num']
        query = None
        if instructor and course_num:
            query = {'instructor': instructor, 'course-num': course_num}
        if instructor:
            query = {'instructor': instructor}
        if course_num:
            query = {'course-num': course_num}
        reviews = [review for review in db.novateachers.find(query)]
        if len(reviews) == 0:
            return output_json("Exception 404", 404)
        return output_json(reviews, 200)

# Crossdomain decorator: use @crossdomain
def crossdomain(origin=None, methods=None, headers=None,
                max_age=21600, attach_to_all=True,
                automatic_options=True):
    if methods is not None:
        methods = ', '.join(sorted(x.upper() for x in methods))
    if headers is not None and not isinstance(headers, basestring):
        headers = ', '.join(x.upper() for x in headers)
    if not isinstance(origin, basestring):
        origin = ', '.join(origin)
    if isinstance(max_age, timedelta):
        max_age = max_age.total_seconds()

    def get_methods():
        if methods is not None:
            return methods

        options_resp = current_app.make_default_options_response()
        return options_resp.headers['allow']

    def decorator(f):
        def wrapped_function(*args, **kwargs):
            if automatic_options and request.method == 'OPTIONS':
                resp = current_app.make_default_options_response()
            else:
                resp = make_response(f(*args, **kwargs))
            if not attach_to_all and request.method != 'OPTIONS':
                return resp

            h = resp.headers
            h['Access-Control-Allow-Origin'] = origin
            h['Access-Control-Allow-Methods'] = get_methods()
            h['Access-Control-Max-Age'] = str(max_age)
            if headers is not None:
                h['Access-Control-Allow-Headers'] = headers
            return resp

        f.provide_automatic_options = False
        return update_wrapper(wrapped_function, f)
    return decorator

def output_json(obj, code, headers=None):
    """
    This is needed because we need to use a custom JSON converter
    that knows how to translate MongoDB types to JSON.
    """
    resp = make_response(dumps(obj), code)
    resp.headers.extend(headers or {})
    return resp

def root_dir(): 
    return os.path.abspath(os.path.dirname(__file__))

def get_file(filename):  
    try:
        src = os.path.join(root_dir(), filename)
        return open(src).read()
    except IOError as exc:
        return str(exc)

@app.route('/site')
def serve_site():
    content = get_file('../build/index.html')
    return Response(content, mimetype="text/html")

def get_resource(path):  
    mimetypes = {
        ".css": "text/css",
        ".html": "text/html",
        ".js": "application/javascript",
    }
    complete_path = os.path.join(root_dir(), 'build')
    complete_path = os.path.join(complete_path, path)
    ext = os.path.splitext(path)[1]
    mimetype = mimetypes.get(ext, "text/html")
    content = get_file(complete_path)
    return Response(content, mimetype=mimetype)

if __name__ == '__main__':
    api.add_resource(ReviewListAPI, '/api/reviews/')
    api.add_resource(ReviewAPI, '/api/reviews/<int:review_id>')
    app.run(host="0.0.0.0", debug=True)
