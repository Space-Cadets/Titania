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

  getTraits: function() {
  // Get the traits for the dash store (why is this here?)
    request(base + 'traits', function(err, res) {
      if (err) {
        console.log('error');
      } else {
        var payload = JSON.parse(res.body);

        AppDispatcher.handleViewAction({
          actionType: DashConstants.GET_TRAITS,
          status: payload.status,
          ctraits: payload.course_traits,
          itraits: payload.instructor_traits
        });
      }
    })
  },

  getUser: function() {
  // Get user information and put in Dash store
    if (!window.token && !localStorage.accessToken) {
      localStorage.accessToken = "";
      browserHistory.push("/register");
    }

    request.get({ url: base + 'user', json: true,
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
    request({ url: base + 'courses/' + name,
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
    request(base + 'recent', function(err, res) {
      if (err) {
        AppDispatcher.handleViewAction({
          actionType: DashConstants.RLOAD_FAILURE,
          status: JSON.parse(res.body).status
        });
      }

      var payload = JSON.parse(res.body);

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

  rateCourse: function(num) {
    AppDispatcher.handleViewAction({
      actionType: DashConstants.RATE_COURSE,
      rating: num
    });
  },

  rateInstructor: function(num) {
    AppDispatcher.handleViewAction({
      actionType: DashConstants.RATE_INSTRUCTOR,
      rating: num
    });
  },

  search: function(query, type) {
  // Get results of fuzzy search (instructor or course) 
  // Query is term, type is either instructor or course
    request({ url: base + type + '/f/' + query,
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

    })
  },

  setFormCourse: function(course) {
  // TODO Move this to Form Actions
  // Store the selected form course
    AppDispatcher.handleViewAction({
      actionType: DashConstants.SET_FORM_COURSE,
      course: course
    });
  },

  setFormInstructor: function(inst) {
  // TODO Move this to Form Actions
  // Store the selected form instructor 
    AppDispatcher.handleViewAction({
      actionType: DashConstants.SET_FORM_INSTRUCTOR,
      instructor: inst
    });
  }
};