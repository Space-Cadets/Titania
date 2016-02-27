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

  fuzzyReviewSearch: function(query) {
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

  setCourses: function(courses) {
    AppDispatcher.handleViewAction({
      actionType: DashConstants.SET_COURSES,
      courses: courses
    });
  },

  addReviewText: function(text) {
    AppDispatcher.handleViewAction({
      actionType: DashConstants.ADD_REVIEW_TEXT,
      text: text
    });
  },

  addTrait: function(type, trait) {
    AppDispatcher.handleViewAction({
      actionType: DashConstants.ADD_TRAIT,
      type: type,
      trait: trait
    });
  },

  removeTrait: function(type, trait) {
    AppDispatcher.handleViewAction({
      actionType: DashConstants.REMOVE_TRAIT,
      type: type,
      trait: trait
    });
  },

  clearForm: function() {
    AppDispatcher.handleViewAction({
      actionType: DashConstants.CLEAR_RFORM,
      purpose: 'FORM COMPLETED'
    });
  },

  sendReview: function(review) {
    // (TODO) TEST ALOT!
    request.post({ url: 'http://localhost:5000/reviews', json: true, body: review },
      function(err, res, body) {
        if (err || res.statusCode !== 200 && res.statusCode !== 401) {
          // (TODO) Handle fail
          AppDispatcher.handleViewAction({
            actionType: DashConstants.SEND_REVIEW_FAILURE,
            status: res.body.status
          });
        }
        // Handle success
        console.log(review + " " + res);

        AppDispatcher.handleViewAction({
          actionType: DashConstants.SEND_REVIEW_SUCCESS,
          status: res.body.message
        });
        
    });
  },


};
