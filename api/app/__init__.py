from flask   import Flask
from pymongo import MongoClient

# Step 1: Load config
import config                     # secrets live here (Create a config.py file)

# Step 2: initialize Flask App object with config information
app     = Flask(__name__)
secret  = config.Config.MONGO_URI # Config should never be pushed to git repo
mclient = MongoClient(secret)     # Start connection between server and MongoDB
db      = mclient.novacourses     # Get course DB
reviews = db.novateachers         # Get teachers collection (where review objects are)

app.config['SECRET_KEY'] = config.Config.SECRET_KEY

# Step 3: Add routes to App
from app import routes