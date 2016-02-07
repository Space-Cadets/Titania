/**
 * Store for Dashboard Application
 */
var AppDispatcher    = require('../dispatchers/AppDispatcher.js');
var DashConstants    = require('../constants/DashConstants.js');
var EventEmitter     = require('events').EventEmitter;
var assign           = require('object-assign');
var CHANGE_EVENT     = 'change';
var _data            = {};


/**
 * Utility functions for store -- for mutating store data
 */

function _stash_search(results) {
  _data.results = results;
}

/**
 * Object through which store data is accessed -- *NOT MUTATED*
 */
var dashStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getData: function() {
    return _data;
  },

  getSearchResults: function() {
    return _data.results;
  }
});

/**
 * REGISTER EVENTS WITH DISPATCHER WHEN THEY ARE CALLED
 */
dashStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;
  switch(action.actionType) {
    //--boilerplate
    // case DashConstants.XXX:
    //   _addToken(action.token);
    //   console.log(action, 'successfully stored.');
    //   break;

    case DashConstants.SEARCH_SUCCESS:
      _stash_search(action.results);
      console.log(action, 'sucessful search returned');
      break;


    default:
      return true;
  }

  dashStore.emitChange();

});

module.exports = dashStore;
