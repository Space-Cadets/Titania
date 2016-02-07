/**
 * Actions for Dashboard Application
 * -- Send calls that will be lined up to mutate data in store
 */

//filters actions for one way data flow
var AppDispatcher = require('../dispatchers/AppDispatcher.js');
var DashConstants = require('../constants/DashConstants.js');
var request       = require('request');

module.exports = {

  // Generic dispatcher call -- BOILERPLATE
  doSomething: function(something) {
    AppDispatcher.handleSetterAction({
      actionType: LoginConstants.DO_SOMETHING,
      something: something
    });
  },

  // Trying this (@ Al Kenobi you're my only hope)
  search: function(query, type) {
    // query is term, type is either instructor or course

    request('http://localhost:5000/'+ type + '/f/' + query, function(err, res) {
      if (err) {
        AppDispatcher.handleViewAction({
          actionType: DashConstants.SEARCH_FAILURE,
          messages: res.body.description
        })
      }
      console.log(res.body);
      AppDispatcher.handleViewAction({
        actionType: DashConstants.SEARCH_SUCCESS,
        results: JSON.parse(res.body).data
      });
    });
  },

  getRecent: function() {
    request('http://localhost:5000/recent', function(err, res) {
      if(err) {
        /* what do i put here */
      }
      AppDispatcher.handleViewAction({
        actionType: DashConstants.GET_RECENT_REVIEWS,
        results: JSON.parse(res.body).data
      });
    });
  },


  getCourse: function(courseName) {
    request('http://localhost:5000/courses/' + courseName, function(err, res) {
      if (err) {
        /* ERROR */
      }
      AppDispatcher.handleViewAction({
        actionType: DashConstants.GET_COURSE,
        results: JSON.parse(res.body).data
      });
    });
  },

  getInstructor: function(instructorName) {
    request('http://localhost:5000/instructors/' + instructorName, function(err, res) {
      if (err) {
        /* ERROR */
      }
      AppDispatcher.handleViewAction({
        actionType: DashConstants.GET_INSTRUCTOR,
        results: JSON.parse(res.body).data
      });
    });
  },

  // Api call -- MODEL (@Al why is this here and not in login actions, jw)
  loginUser: function(email, password) {
    request.post('http://localhost:5000/auth')
    .send({'username': email, 'password': password})
    .end(function(err, res) {
        if (err) {
          // Handle fail
          AppDispatcher.handleViewAction({
            actionType: LoginConstants.LOGIN_USER_FAIL,
            messages: res.body.description
          });
        }
        console.log(res.body);
        // Handle success
        AppDispatcher.handleViewAction({
          actionType: LoginConstants.LOGIN_USER_SUCCESS,
          token: res.body['access_token']
        });
    });
  }
};
