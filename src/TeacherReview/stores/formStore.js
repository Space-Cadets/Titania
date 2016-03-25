var AppDispatcher = require('../dispatchers/AppDispatcher.js');
var FormConstants = require('../constants/FormConstants.js');
var EventEmitter  = require('events').EventEmitter;
var assign        = require('object-assign');

var CHANGE_EVENT  = 'change';

var _form = {
  fuzzy: [],
  instructor: '',
  course: '',
  istars: 0,
  cstars: 0,
  itraits: [],
  ctraits: [],
  active_itraits: [],
  active_ctraits: [],
  review: ''
}

function _add_trait(type, trait) {
  if (type === 'course') {
    _form.active_ctraits.push(trait);
  }
  else if (type === 'instructor') {
    _form.active_itraits.push(trait);
  }
}

function _clear_rform() {
  _form = {
    fuzzy: [],
    instructor: '',
    course: '',
    istars: 0,
    cstars: 0,
    itraits: [],
    ctraits: [],
    active_itraits: [],
    active_ctraits: [],
    review: ''
  };
}

function _fuzzy_review_search(results) {
  _form.fuzzy = results;
}

function _rate_course(num) {
  _form.cstars = num;
}

function _rate_instructor(num) {
  _form.istars = num;
}

function _remove_trait(type, trait) {
  if (type === 'course') {
    var ind = _form.active_ctraits.indexOf(trait);
    _form.active_ctraits.splice(ind, 1);
  } else if (type === 'instructor') {
    var ind = _form.active_itraits.indexOf(trait);
    _form.active_itraits.splice(ind, 1);
  }
}

function _set_course(course) {
  _form.course = course;
}

function _set_course_traits(traits) {
  _form.ctraits = traits;
}

function _set_instructor(instructor) {
  _form.instructor = instructor;
}

function _set_instructor_traits(traits) {
  _form.itraits = traits;
}

function _set_form_courses(courses) {
  _form.courses = courses;
}

function _set_review_text(text) {
  _form.review = text;
}

var formStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getFuzzyReviewSearch: function() {
    return _form.fuzzy;
  },

  getFormCourses: function() {
    return _form.courses;
  },

  getCourseRating: function() {
    return _form.cstars;
  },

  getInstructorRating: function() {
    return _form.istars;
  },

  // Maybe
  getITraits: function() {
    return _form.active_itraits;
  },

  // Also Maybe
  getCTraits: function() {
    return _form.active_ctraits;
  },

  getTraits: function() {
    return {itraits: _form.itraits, ctraits: _form.ctraits};
  },

  getReviewText: function() {
    return _form.review;
  },

  getFullForm: function() {
    return _form;
  },

});

/**
 * REGISTER EVENTS WITH DISPATCHER WHEN THEY ARE CALLED
 */
formStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.actionType) {

    case FormConstants.ADD_REVIEW_TEXT: ////
      _set_review_text(action.text);
      break;

    case FormConstants.ADD_TRAIT: ////
      _add_trait(action.type, action.trait);
      break;

    case FormConstants.CLEAR_RFORM: ////
      _clear_rform();
      break;

    case FormConstants.FUZZY_REVIEW_SEARCH: ////
      _fuzzy_review_search(action.results);
      break;

    case FormConstants.GET_TRAITS:
      _set_instructor_traits(action.itraits);
      _set_course_traits(action.ctraits);
      break;

    case FormConstants.RATE_COURSE: ////
      _rate_course(action.rating);
      break;

    case FormConstants.RATE_INSTRUCTOR: ////
      _rate_instructor(action.rating);
      break;

    case FormConstants.REMOVE_TRAIT: ////
      _remove_trait(action.type, action.trait);
      break;

    case FormConstants.SET_FORM_COURSE: ////
      _set_course(action.course);
      break;

    case FormConstants.SET_FORM_INSTRUCTOR: ////
      _set_instructor(action.instructor);
      break;

    case FormConstants.SET_COURSES: ////
      _set_form_courses(action.courses);
      break;

    // (TODO) Add FAILURE cases

    default:
      return true;
  }

  formStore.emitChange();

});

module.exports = formStore;