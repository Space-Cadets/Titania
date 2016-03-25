/**
 * Actions for SuperForm 
 * -- Send calls that will be lined up to mutate data in store
 */

// Filters actions for one way data flow
var request        = require('request');
var browserHistory = require('react-router').browserHistory;

var AppDispatcher  = require('../dispatchers/AppDispatcher.js');
var DashConstants  = require('../constants/DashConstants.js');

var base = 'http://localhost:5000/';

module.exports = {

  addReviewText: function(text) {
  // Add text from review to form store
    AppDispatcher.handleViewAction({
      actionType: DashConstants.ADD_REVIEW_TEXT,
      text: text
    });
  },

  addTrait: function(type, trait) {
  // Add trait (either instructor or course) to form store
    AppDispatcher.handleViewAction({
      actionType: DashConstants.ADD_TRAIT,
      type: type,
      trait: trait
    });
  },

  clearForm: function() {
  // Clear the form store (after review is submitted)
    AppDispatcher.handleViewAction({
      actionType: DashConstants.CLEAR_RFORM,
      purpose: 'FORM COMPLETED'
    });
  },

  fuzzyReviewSearch: function(query) {
  // get instructors for fuzzy search in form and add to form store
    request({ url: base + 'instructors' + '/f/' + query,
      headers: {
        'Authorization': "JWT " + localStorage.accessToken || window.token,
        'Content-Type': "application/json"
      }
    }, function(err, res) {
      if (err) {
        AppDispatcher.handleViewAction({
          actionType: DashConstants.SEARCH_FAILURE,
          messages: res.body.description
        });
      }

      AppDispatcher.handleViewAction({
        actionType: DashConstants.FUZZY_REVIEW_SEARCH,
        results: JSON.parse(res.body).data
      });
    });
  },

  removeTrait: function(type, trait) {
  // Remove trait (either instructor or course) from form store
    AppDispatcher.handleViewAction({
      actionType: DashConstants.REMOVE_TRAIT,
      type: type,
      trait: trait
    });
  },

  setCourses: function(courses) {
  // Set courses that instructor teaches in the form store
    AppDispatcher.handleViewAction({
      actionType: DashConstants.SET_COURSES,
      courses: courses
    });
  },

  sendReview: function(review) {
  // Send review to Oberon -- Will change soon
    request.post({ url: base + 'reviews', json: true, body: review },
      function(err, res, body) {
        if (err || res.statusCode !== 200 && res.statusCode !== 401) {
          // (TODO) Handle fail
          AppDispatcher.handleViewAction({
            actionType: DashConstants.SEND_REVIEW_FAILURE,
            status: res.body.status
          });
        }

        AppDispatcher.handleViewAction({
          actionType: DashConstants.SEND_REVIEW_SUCCESS,
          status: res.body.message
        });
        
    });
  },
  
  validateReview: function(review) {
  // TODO remove this or change to perform frontend validation
    request.get({ url: 'http://localhost:5000/sections/Edward%20Kim/Independent%20Study' }, function(err, res, body) {
        console.log(err, res, body);
    });
  }
};
