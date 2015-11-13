/**
 * Actions for Login Application
 * -- Send calls that will be lined up to mutate data in store
 */

//filters actions for one way data flow
var AppDispatcher    = require('../dispatchers/AppDispatcher.js');
//defined user actions
var LoginConstants   = require('../constants/LoginConstants.js');
//Superagent request
var request          = require('superagent');

module.exports = {

  //generic dispatcher call
  doSomething: function(something) {
    AppDispatcher.handleSetterAction({
      actionType: LoginConstants.DO_SOMETHING,
      something: something
    });
  },

  //api call
  sendRequest: function(money) {
    request.get('http://localhost:8080/api/' + money)
    .end(function(err, res) {
        if (err) {
          //handle fail
          AppDispatcher.handleViewAction({
            actionType: LoginConstants.LOAD_MESSAGES,
            messages: res.body.messages
          });
        }
        //handle success
        AppDispatcher.handleViewAction({
          actionType: LoginConstants.LOAD_MESSAGES,
          messages: res.body.messages
        });
    });
  }
};
