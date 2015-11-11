from mongoengine import *

class User(Document):
	user_id  = ObjectIdField(required=True) # replace with Mongo ID
	username = StringField(required=True, max_length=100)
	password = StringField(required=True) # Hash is string
	created  = DateTimeField(default=datetime.datetime.now)

class Review(Document):
	review_id         = ObjectIdField(required=True) # replace with Mongo ID
	class_id          = ObjectIdField(required=True)
	class_rating      = IntField(required=True, max_value=5)
	instructor_id     = ObjectIdField(required=True)
	instructor_rating = IntField(required=True, max_value=5)
	
	tags     = ListField(StringField(max_length=50))
	body     = StringField(required=True, max_length=3000)
	semester = StringField(required=True, max_length=50)
	user     = ObjectIdField(required=True)
	date     = DateTimeField(default=datetime.datetime.now)

class Instructor(Document):
	instructor_id = ObjectIdField(required=True) # replace with Mongo ID
	registry_id   = ObjectIdField(required=True)
	name          = StringField(required=True, max_length=200)

class Registry(Document):
	section_id    = ObjectIdField(required=True)
	instructor_id = ObjectIdField(required=True)
	registry_id   = ObjectIdField(required=True) # replace with Mongo ID

class Section(Document):
	section_id = ObjectIdField(required=True)    # replace with Mongo ID
	course_id  = ObjectIdField(required=True)
	number     = IntField(required=True)

class Course(Document):
	course_id = ObjectIdField(required=True) # replace with Mongo UUID
	name = StringField(required=True, max_length=200)
