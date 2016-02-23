/**
 * Store for Dashboard Application
 */
var AppDispatcher       = require('../dispatchers/AppDispatcher.js');
var DashConstants       = require('../constants/DashConstants.js');
var EventEmitter        = require('events').EventEmitter;
var assign              = require('object-assign');

var CHANGE_EVENT        = 'change';

var _data = {

  // Model for _data user store
  user: {
    name: 'Student',
    reviews: {}
  },

  // Model for _data form store
  form: {
    fuzzy: [],
    instructor: '',
    course: '',
    istars: 0,
    cstars: 0,
    itraits: [],
    ctraits: [],
    review: ''
  },

  itraits: [],

  ctraits: [],

  results: []
  
}

/**
 * Utility functions for store - for mutating store data
 */

function _getUser(user) {
  //later maybe populate other types of data? Or consolidate this into feed request?
  _data.user.name = user.user.first_name + " " + user.user.last_name;
}

function _set_instructor(instructor) {
  _data.form.instructor = instructor;
}

function _set_course(course) {
  _data.form.course = course;
}

function _stash_search(results) {
  _data.results = results;
}

function _tpage_load(results) {
  _data.tpage = results;
}

function _cpage_load(results) {
  _data.cpage = results;
}

function _fuzzy_review_search(results) {
  _data.form.fuzzy = results;
}

// here
function _set_form_courses(courses) {
  _data.form.courses = courses;
}

function _rate_instructor(num) {
  _data.form.istars = num;
}

function _rate_course(num) {
  _data.form.cstars = num;
}

function _recreviews_load(results) {
  _data.recent_reviews = results;
}

function _set_course_traits(traits) {
  _data.ctraits = traits;
}

function _set_instructor_traits(traits) {
  _data.itraits = traits;
}

function _set_review_text(text) {
  _data.form.review = text;
}

// Test these!
function _add_trait(type, trait) {
  if (type === 'course')
    _data.form.ctraits.push(trait);
  else if (type === 'instructor')
    _data.form.itraits.push(trait);
}

function _remove_trait(type, trait) {

  if (type === 'course') {
    var ind = _data.form.ctraits.indexOf(trait);
    _data.form.ctraits.splice(ind, 1);
  } else if (type === 'instructor') {
    var ind = _data.form.itraits.indexOf(trait);
    _data.form.ctraits.splice(ind, 1);
  }
}

/**
 * Object through which store data is accessed -- *NOT MUTATED*
 */
var dashStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getData: function() {
    return _data;
  },

  getSearchResults: function() {
    return _data.results;
  },

  getTeacherPage: function() {
    return _data.tpage;
  },

  getCoursePage: function() {
    return _data.cpage;
  },

  getRecentReviews: function() {
    return _data.recent_reviews;
  },

  getFuzzyReviewSearch: function() {
    return _data.form.fuzzy;
  },

  getFormCourses: function() {
    return _data.form.courses;
  },

  getCourseRating: function() {
    return _data.form.cstars;
  },

  getInstructorRating: function() {
    return _data.form.istars;
  },

  getTraits: function() {
    return {itraits: _data.itraits, ctraits: _data.ctraits};
  },

  getITraits: function() {
    return _data.form.itraits;
  },

  getCTraits: function() {
    return _data.form.ctraits;
  },

  getReviewText: function() {
    return _data.form.review;
  },

  getFullForm: function() {
    return _data.form;
  }

});

/**
 * REGISTER EVENTS WITH DISPATCHER WHEN THEY ARE CALLED
 */
dashStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.actionType) {

    case DashConstants.SEARCH_SUCCESS:
      _stash_search(action.results);
      console.log(action, 'successful search returned');
      break;

    case DashConstants.TLOAD_SUCCESS:
      _tpage_load(action.info);
      console.log(action, 'instructor information recieved');
      break;

    case DashConstants.CLOAD_SUCCESS:
      _cpage_load(action.info);
      console.log(action, 'class information recieved');
      break;

    case DashConstants.RLOAD_SUCCESS:
      _recreviews_load(action.reviews);
      console.log(action, 'recent reviews recieved');
      break;

    case DashConstants.GET_USER:
      _getUser(action.user);
      break;

    case DashConstants.SET_FORM_INSTRUCTOR:
      _set_instructor(action.instructor);
      console.log(action, 'set instructor');
      break;

    case DashConstants.SET_FORM_COURSE:
      _set_course(action.course);
      console.log(action, 'set course');
      break;

    case DashConstants.FUZZY_REVIEW_SEARCH:
      _fuzzy_review_search(action.results);
      console.log(action, 'successful search returned');
      break;

    case DashConstants.SET_COURSES:
      _set_form_courses(action.courses);
      console.log(action, 'got their courses');
      break;

    case DashConstants.RATE_INSTRUCTOR:
      _rate_instructor(action.rating)
      console.log(action, 'rated instructor');
      break;

    case DashConstants.RATE_COURSE:
      _rate_course(action.rating);
      console.log(action, 'rated course');
      break;

    case DashConstants.GET_TRAITS:
      console.log(action, 'storing traits');
      _set_instructor_traits(action.itraits);
      _set_course_traits(action.ctraits);
      break;

    case DashConstants.ADD_REVIEW_TEXT:
      _set_review_text(action.text);
      console.log(_data.form.review);
      break;

    case DashConstants.ADD_TRAIT:
      console.log(action);
      _add_trait(action.type, action.trait);
      break;

    case DashConstants.REMOVE_TRAIT:
      console.log(_data.form);
      _remove_trait(action.type, action.trait);
      break;

    // (TODO) Add FAILURE cases

    default:
      return true;
  }

  dashStore.emitChange();

});

module.exports = dashStore;
