/**
 * Actions for Login Application
 * -- Send calls that will be lined up to mutate data in store
 */

//filters actions for one way data flow
var AppDispatcher  = require('../dispatchers/AppDispatcher.js');
//defined user actions
var LoginConstants = require('../constants/LoginConstants.js');
//Superagent request
var request        = require('request');

function validateForm(userInfo) {
    if ( userInfo.email.substr(userInfo.email.length - 14).toLowerCase() !== "@villanova.edu") {
    //return info
    return {
      success: false,
      description: "Please enter a Villanova.edu email"
    };
  }
  //check Names
  if (!userInfo.firstName || !userInfo.lastName) {
    return {
      success: false,
      description: "Please enter a first and last name"
    };
  }

  //check password
  if (userInfo.password.length < 7) {
    return {
      success: false,
      description: "Passwords must be 7+ characters"
    };
  }

  return {
    success: true,
    description: "Check your email to validate your account"
  }
}

module.exports = {

  //generic dispatcher call
  doSomething: function(something) {
    AppDispatcher.handleSetterAction({
      actionType: LoginConstants.DO_SOMETHING,
      something: something
    });
  },

  //api call
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
  },

  signupUser: function(userInfo) {
    var response = validateForm(userInfo);
    /*
      {
        success: boolean,
        description: string
      }
    */
    if (!response.success) {
      AppDispatcher.handleViewAction({
        actionType: LoginConstants.SIGNUP_FAILURE,
        info: response
      });
      return;
    }
    console.log(userInfo);
    request.post({url: 'http://localhost:5000/signup', body: userInfo}, function(err, res){
        if (err) {
          AppDispatcher.handleViewAction({
            actionType: LoginConstants.SIGNUP_FAILURE,
            info: {
              success: false,
              description: "Something went wrong"
            }
          });
          return;
        }
        if (res.success) {
          AppDispatcher.handleViewAction({
            actionType: LoginConstants.SIGNUP_SUCCESS,
            info: res
          });
        } else {
          AppDispatcher.handleViewAction({
            actionType: LoginConstants.SIGNUP_FAILURE,
            info: res
          });
        }
      });
  }
};
