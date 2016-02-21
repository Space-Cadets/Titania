/**
 * Actions for SuperForm 
 * -- Send calls that will be lined up to mutate data in store
 */

// Filters actions for one way data flow
var request        = require('request');
var browserHistory = require('react-router').browserHistory;

var AppDispatcher  = require('../dispatchers/AppDispatcher.js');
var DashConstants  = require('../constants/DashConstants.js');

module.exports = {

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
    })
  },

  removeTrait: function(type, trait) {
    AppDispatcher.handleViewAction({
      actionType: DashConstants.REMOVE_TRAIT,
      type: type,
      trait: trait
    })
  }

};
