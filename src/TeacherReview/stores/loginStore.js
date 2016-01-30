/**
 * Store for Login Application
 */
var AppDispatcher                  = require('../dispatchers/AppDispatcher.js');
var LoginConstants                 = require('../constants/LoginConstants.js');
var EventEmitter                   = require('events').EventEmitter;
var assign                         = require('object-assign');
var CHANGE_EVENT                   = 'change';
var _data                          = {};
    _data.signup                   = {};
    _data.signup.notification      = {};
    _data.signup.notification.show = false;

/**
 * Utility functions for store -- for mutating store data
 */

function _addToken(token) {
  _data['access-token'] = token;
}

function _signup(info) {
  _data.signup.notification = info;
  _data.signup.notification.show = true;
}

 /**
  * Object through which store data is accessed -- *NOT MUTATED*
  */
var loginStore = assign({}, EventEmitter.prototype, {

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
  }
});

/**
 * REGISTER EVENTS WITH DISPATCHER WHEN THEY ARE CALLED
 */
loginStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;
  switch(action.actionType) {

    case LoginConstants.LOGIN_USER_SUCCESS:
      _addToken(action.token);
      console.log(action, 'successfully stored.');
      break;

    case LoginConstants.LOGIN_USER_FAIL:
      console.log(action.message);
      break;

    case LoginConstants.SIGNUP_FAILURE:
      _signup(action.info);
      break;

    case LoginConstants.SIGNUP_SUCCESS:
      _signup(action.info);
      break;

    default:
      return true;
  }

  loginStore.emitChange();

});

module.exports = loginStore;
