from flask   import Flask
from pymongo import MongoClient

import config                     # secrets live here (Create a config.py file)

app     = Flask(__name__)
secret  = config.Config.MONGO_URI # Config should never be pushed to git repo
mclient = MongoClient(secret)     # Start connection between server and MongoDB
db      = mclient.novacourses     # Get course DB
reviews = db.novateachers         # Get teachers

import routes