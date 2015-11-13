from mongoengine import *
import datetime
class User(Document):
    email    = EmailField(required=True)
    username = StringField(required=True, max_length=100)
    password = StringField(required=True)                   # Hash is string
    created  = DateTimeField(default=datetime.datetime.now)

class Review(Document):
    review_id         = ObjectIdField(required=True)        # Figure this out
    class_name        = StringField(required=True, max_length=200)
    class_rating      = IntField(required=True, max_value=5, min_value=0)
    instructor_name   = StringField(required=True, max_length=200)
    instructor_rating = IntField(required=True, max_value=5, min_value=0)
    tags              = ListField(StringField(max_length=50))
    body              = StringField(required=True, max_length=3000)
    semester          = StringField(required=True, max_length=50)
    author            = EmailField(required=True)
    date              = DateTimeField(default=datetime.datetime.now)

class Instructor(Document):
    name     = StringField(required=True, max_length=200)
    sections = ListField(StringField(max_length=20))        # List of CRNs

class Section(Document):
    section_number  = StringField(required=True, max_length=20)   
    subject_number  = StringField(required=True, max_length=200)
    instructor_name = ListField(StringField(required=True, max_length=200))
    start_time      = StringField(required=True, max_length=100)
    end_time        = StringField(required=True, max_length=100)
    days            = StringField(max_length=30)
    crn             = StringField(max_length=20)

class Course(Document):
    name            = StringField(required=True, max_length=200)
    subject_number  = StringField(required=True, max_length=200)
    sections        = ListField(StringField(max_length=25)) # List of CRNs
    comment         = StringField(max_length=200)
    restrictions    = ListField(StringField(max_length=150))