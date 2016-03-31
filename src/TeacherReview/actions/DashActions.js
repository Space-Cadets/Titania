/**
 * Actions for Dashboard Application
 * -- Send calls that will be lined up to mutate data in store
 */

// Filters actions for one way data flow
var request        = require('request');
var browserHistory = require('react-router').browserHistory;

var AppDispatcher  = require('../dispatchers/AppDispatcher.js');
var DashConstants  = require('../constants/DashConstants.js');


// To Change
var base = 'http://localhost:5000/';

module.exports = {

  getUser: function() {
  // Get user information and put in Dash store
    if (!window.token && !localStorage.accessToken) {
      localStorage.accessToken = "";
      browserHistory.push("/login");
    }

    request.get({
      url: base + 'user',
      json: true,
      headers: {
        'Authorization': "JWT " + localStorage.accessToken || window.token
      }
    }, function(err, res, body) {
        if (err || res.statusCode !== 200 && res.statusCode !== 401) {
          // Handle fail
          localStorage.accessToken = "";
          browserHistory.push("/login");
          return;
        }
        // Handle success
        AppDispatcher.handleViewAction({
          actionType: DashConstants.GET_USER,
          user: body
        });
    });
  },

  loadCoursePage: function(name) {
  // Load the course information for a course page and put in dash store
    request({
      url: base + 'courses/' + name,
      json: true,
      headers: {
        'Authorization': "JWT " + localStorage.accessToken || window.token,
        'Content-Type': "application/json"
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

  loadRecentReviews: function() {
  // Get the most recent reviews for the dash store
    request({
      url: base + 'recent',
      json: true,
      headers: {
        'Authorization': "JWT " + localStorage.accessToken || window.token,
        'Content-Type': "application/json"
      }
    }, function(err, res) {
      if (err) {
        AppDispatcher.handleViewAction({
          actionType: DashConstants.RLOAD_FAILURE,
          status: JSON.parse(res.body).status
        });
      }

      var payload = res.body

      AppDispatcher.handleViewAction({
        actionType: DashConstants.RLOAD_SUCCESS,
        status: payload.status,
        reviews: payload.data
      });

    });
  },

  loadTeacherPage: function(name) {
  // TODO rename this to instructor if possible
  // Load the instructor information for a instructor page and put in dash store
    request({
      url: base + 'instructors/' + name,
      json: true,
      headers: {
        'Authorization': "JWT " + localStorage.accessToken || window.token,
        'Content-Type': "application/json"
      }
    }, function(err, res) {
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

  search: function(query, type) {
  // Get results of fuzzy search (instructor or course)
  // Query is term, type is either instructor or course
    request({
      url: base + type + '/f/' + query,
      json: true,
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
        actionType: DashConstants.SEARCH_SUCCESS,
        results: JSON.parse(res.body).data
      });

    });
  },
};
