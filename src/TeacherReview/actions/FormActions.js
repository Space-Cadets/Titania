/**
 * Actions for SuperForm 
 * -- Send calls that will be lined up to mutate data in store
 */

// Filters actions for one way data flow
var request        = require('request');
var browserHistory = require('react-router').browserHistory;

var AppDispatcher  = require('../dispatchers/AppDispatcher.js');
var FormConstants  = require('../constants/FormConstants.js');

var base = 'http://localhost:5000/';

module.exports = {

  addReviewText: function(text) {
  // Add text from review to form store
    AppDispatcher.handleViewAction({
      actionType: FormConstants.ADD_REVIEW_TEXT,
      text: text
    });
  },

  addTrait: function(type, trait) {
  // Add trait (either instructor or course) to form store
    AppDispatcher.handleViewAction({
      actionType: FormConstants.ADD_TRAIT,
      type: type,
      trait: trait
    });
  },

  clearForm: function() {
  // Clear the form store (after review is submitted)
    AppDispatcher.handleViewAction({
      actionType: FormConstants.CLEAR_RFORM,
      purpose: 'FORM COMPLETED'
    });
  },

  fuzzyReviewSearch: function(query) {
  // get instructors for fuzzy search in form and add to form store
    request({ 
      url: base + 'instructors' + '/f/' + query,
      json: true,
      headers: {
        'Authorization': "JWT " + localStorage.accessToken || window.token,
      }
    }, function(err, res) {
      if (err) {
        AppDispatcher.handleViewAction({
          actionType: FormConstants.SEARCH_FAILURE,
          messages: res.body.description
        });
      }

      AppDispatcher.handleViewAction({
        actionType: FormConstants.FUZZY_REVIEW_SEARCH,
        results: res.body.data
      });
    });
  },

  getTraits: function() {
  // Get the traits for the form
    request({
      url: base + 'traits',
      json: true,
      headers: {
        'Authorization': "JWT " + localStorage.accessToken || window.token,
      }
    }, function(err, res) {
      if (err) {
        console.log('error');
      } else {
        var payload = res.body;
        console.log(res);
        AppDispatcher.handleViewAction({
          actionType: FormConstants.GET_TRAITS,
          status: payload.status,
          ctraits: payload.course_traits,
          itraits: payload.instructor_traits
        });
      }
    })
  },

  rateCourse: function(num) {
    AppDispatcher.handleViewAction({
      actionType: FormConstants.RATE_COURSE,
      rating: num
    });
  },

  rateInstructor: function(num) {
    AppDispatcher.handleViewAction({
      actionType: FormConstants.RATE_INSTRUCTOR,
      rating: num
    });
  },

  removeTrait: function(type, trait) {
  // Remove trait (either instructor or course) from form store
    AppDispatcher.handleViewAction({
      actionType: FormConstants.REMOVE_TRAIT,
      type: type,
      trait: trait
    });
  },

  setCourses: function(courses) {
  // Set courses that instructor teaches in the form store
    AppDispatcher.handleViewAction({
      actionType: FormConstants.SET_COURSES,
      courses: courses
    });
  },

  sendReview: function(review) {
  // Send review to Oberon -- Will change soon
  
    request.post({ 
      url: base + 'reviews', 
      json: true, 
      body: review,
      headers: {
        'Authorization': "JWT " + localStorage.accessToken || window.token,
      }
    }, function(err, res, body) {
        if (err || res.statusCode !== 200 && res.statusCode !== 401) {
          // (TODO) Handle fail
          AppDispatcher.handleViewAction({
            actionType: FormConstants.SEND_REVIEW_FAILURE,
            status: res.body.status
          });
        }

        AppDispatcher.handleViewAction({
          actionType: FormConstants.SEND_REVIEW_SUCCESS,
          status: res.body.message
        });
        
    });
  },

  setFormCourse: function(course) {
  // TODO Move this to Form Actions
  // Store the selected form course
    AppDispatcher.handleViewAction({
      actionType: FormConstants.SET_FORM_COURSE,
      course: course
    });
  },

  setFormInstructor: function(inst) {
  // TODO Move this to Form Actions
  // Store the selected form instructor 
    AppDispatcher.handleViewAction({
      actionType: FormConstants.SET_FORM_INSTRUCTOR,
      instructor: inst
    });
  },
};
