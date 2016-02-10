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

  // Trying this (@ Al Kenobi you're my only hope)
  search: function(query, type) {

    // Query is term, type is either instructor or course
    request(base + type + '/f/' + query, function(err, res) {
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
    request(base + 'courses/' + name, function(err, res) {
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
  }

};
