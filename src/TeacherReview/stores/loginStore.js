/**
 * Store for Login Application
 */
var AppDispatcher                  = require('../dispatchers/AppDispatcher.js');
var LoginConstants                 = require('../constants/LoginConstants.js');
var EventEmitter                   = require('events').EventEmitter;
var assign                         = require('object-assign');
var browserHistory                 = require('react-router').browserHistory;
var CHANGE_EVENT                   = 'change';
var _data                          = {};
    _data.signup                   = {};
    _data.signup.notification      = {};
    _data.signup.notification.show = false;
    _data.login                    = {};
    _data.login.notification       = {};
    _data.login.notification.show  = false;

// var _data = {
//   signup: {
//     notification: { show: false }
//   },

//   login: {
//     notification: { show: false }
//   }
// }

/**
 * Utility functions for store -- for mutating store data
 */

//signup should show notification for either success or failure
function _signup(info) {
  _data.signup.notification = info;
  _data.signup.notification.show = true;
}

//login should only show notification for failure
function _login(token) {
  window.token = token; //keep token as a global for those private browsers (ಥ ͜ʖಥ)
  localStorage.accessToken = token; //set it up
  browserHistory.push('/'); //re-route to dashboard
}

//login failure
function _loginFail(description) {
  _data.login.notification = { success: false, description: description };
  _data.login.notification.show = true;
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
      _login(action.token);
      break;

    case LoginConstants.LOGIN_USER_FAIL:
      _loginFail(action.description);
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
