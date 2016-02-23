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

  search: function(query, type) {

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

  sendReview: function(review) {
    // Login should be done server side -- give ambiguous errors ('either email or pw incorrect')
    request.post({ url: 'http://localhost:5000/reviews', json: true, body: review },
      function(err, res, body) {
        if (err || res.statusCode !== 200 && res.statusCode !== 401) {
          // Handle fail
          console.log(res);
        }
        // Handle success
        console.log(review + " " + res);
    });
  },

  loadRecentReviews: function() {

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

  getTraits: function() {
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

  setFormInstructor: function(inst) {
    AppDispatcher.handleViewAction({
      actionType: DashConstants.SET_FORM_INSTRUCTOR,
      instructor: inst
    });
  },

  setFormCourse: function(course) {
    AppDispatcher.handleViewAction({
      actionType: DashConstants.SET_FORM_COURSE,
      course: course
    });
  },

  rateInstructor: function(num) {
    AppDispatcher.handleViewAction({
      actionType: DashConstants.RATE_INSTRUCTOR,
      rating: num
    });
  },

  rateCourse: function(num) {
    AppDispatcher.handleViewAction({
      actionType: DashConstants.RATE_COURSE,
      rating: num
    });
  }
};
