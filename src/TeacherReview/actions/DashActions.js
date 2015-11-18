/**
 * Actions for Dashboard Application
 * -- Send calls that will be lined up to mutate data in store
 */

//filters actions for one way data flow
var AppDispatcher    = require('../dispatchers/AppDispatcher.js');
//defined user actions
var DashConstants   = require('../constants/DashConstants.js');
//Superagent request
var request          = require('superagent');

module.exports = {

  //generic dispatcher call -- BOILERPLATE
  doSomething: function(something) {
    AppDispatcher.handleSetterAction({
      actionType: LoginConstants.DO_SOMETHING,
      something: something
    });
  },

  //api call -- BOILERPLATE
  loginUser: function(email, password) {
    request.post('http://localhost:5000/auth')
    .send({'username': email, 'password': password})
    .end(function(err, res) {
        if (err) {
          //handle fail
          AppDispatcher.handleViewAction({
            actionType: LoginConstants.LOGIN_USER_FAIL,
            messages: res.body.description
          });
        }
        console.log(res.body);
        //handle success
        AppDispatcher.handleViewAction({
          actionType: LoginConstants.LOGIN_USER_SUCCESS,
          token: res.body['access_token']
        });
    });
  }
};