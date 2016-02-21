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
    instructor: '',
    course: '',
    istars: 0,
    cstars: 0,
    itraits: [],
    ctraits: [],
    review: ''
  },

  itraits: [],

  ctraits: []
}

/**
 * Utility functions for store - for mutating store data
 */

function _getUser(user) {
  //later maybe populate other types of data? Or consolidate this into feed request?
  _data.user.name = user.firstName + " " + user.lastName;
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

  getTraits: function() {
    return {itraits: _data.itraits, ctraits: _data.ctraits};
  },

  getReviewText: function() {
    return _data.form.review;
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
      console.log(action, 'user logger in');
      break;

    case DashConstants.SET_FORM_INSTRUCTOR:
      _set_instructor(action.instructor);
      console.log(action, 'set instructor');
      break;

    case DashConstants.SET_FORM_COURSE:
      _set_course(action.course);
      console.log(action, 'set course');
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
      // _get_traits();
      console.log(action, 'storing traits');
      _set_instructor_traits(action.itraits);
      _set_course_traits(action.ctraits);
      break;

    case DashConstants.ADD_REVIEW_TEXT:
      console.log(action, 'modifying review text');
      _set_review_text(action.text);
      break;

    // (TODO) Add FAILURE cases

    default:
      return true;
  }

  dashStore.emitChange();

});

module.exports = dashStore;
