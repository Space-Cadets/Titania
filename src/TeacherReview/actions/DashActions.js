/**
 * Actions for Dashboard Application
 * -- Send calls that will be lined up to mutate data in store
 */

// Filters actions for one way data flow
var AppDispatcher = require('../dispatchers/AppDispatcher.js');
var DashConstants = require('../constants/DashConstants.js');
var request       = require('request');

// To Change
var base = 'http://localhost:5000/';

module.exports = {

  // Generic dispatcher call -- BOILERPLATE
  doSomething: function(something) {
    AppDispatcher.handleSetterAction({
      actionType: LoginConstants.DO_SOMETHING,
      something: something
    });
  },

  search: function(query, type) {

    // Query is term, type is either instructor or course
    request({ url: base + type + '/f/' + query,
      headers: {
        'Authorization': "JWT " + localStorage.accessToken || window.token
      }
    }, function(err, res) {
      if (err) {
        AppDispatcher.handleViewAction({
          actionType: DashConstants.SEARCH_FAILURE,
          messages: res.body.description
        });
      }

      AppDispatcher.handleViewAction({
        actionType: DashConstants.SEARCH_SUCCESS,
        results: JSON.parse(res.body).data
      });

    })
  },

  loadTeacherPage: function(name) {
    request(base + 'instructors/' + name, function(err, res) {
      if (err) {
        AppDispatcher.handleViewAction({
          actionType: DashConstants.TLOAD_FAILURE,
          messages: res.body.description
        });
      }

      AppDispatcher.handleViewAction({
        actionType: DashConstants.TLOAD_SUCCESS,
        info: JSON.parse(res.body).data
      });
    });
  },

  loadCoursePage: function(name) {
    request({ url: base + 'courses/' + name,
      headers: {
        'Authorization': "JWT " + localStorage.accessToken || window.token
      }
    }, function(err, res) {
      if (err) {
        AppDispatcher.handleViewAction({
          actionType: DashConstants.CLOAD_FAILURE,
          messages: res.body.description
        });
      }

      AppDispatcher.handleViewAction({
        actionType: DashConstants.CLOAD_SUCCESS,
        info: JSON.parse(res.body).data
      });

    })
  },
  sendReview: function(review) {
    //login should be done server side -- give ambiguous errors ('either email or pw incorrect')
    request.post({ url: 'http://localhost:5000/reviews', json: true, body: review },
      function(err, res, body) {
        if (err || res.statusCode !== 200 && res.statusCode !== 401) {
          //handle fail
          console.log(res);
        }
        //handle success
        console.log(review + " " + res);
    });
  },

};
