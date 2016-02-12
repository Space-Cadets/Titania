/**
 * Actions for Login Application
 * -- Send calls that will be lined up to mutate data in store
 */

//filters actions for one way data flow
var AppDispatcher  = require('../dispatchers/AppDispatcher.js');
//defined user actions
var LoginConstants = require('../constants/LoginConstants.js');
//request -- Ajax
var request        = require('request');

function validateSignupForm(userInfo) {
  //check Email
  if ( userInfo.email.substr(userInfo.email.length - 14).toLowerCase() !== "@villanova.edu") {
    //return info
    return {
      success: false,
      description: "Please enter a Villanova.edu email"
    };
  }
  //check Names for equality, hope we don't have some students with mean parents (same first and last name)
  if (userInfo.firstName === userInfo.lastName) {
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

  //all tests passed, send for server side auth
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
  loginUser: function(userInfo) {
    //login should be done server side -- give ambiguous errors ('either email or pw incorrect')
    request.post({ url: 'http://localhost:5000/auth', json: true, body: userInfo },
      function(err, res, body) {
        if (err || res.statusCode !== 200 && res.statusCode !== 401) {
          //handle fail
          AppDispatcher.handleViewAction({
            actionType: LoginConstants.LOGIN_USER_FAIL,
            description: "Something went wrong"
          });
          return;
        }
        //handle success
        AppDispatcher.handleViewAction({
          actionType: LoginConstants.LOGIN_USER_SUCCESS,
          token: body['access_token']
        });
    });
  },

  signupUser: function(userInfo) {
    var response = validateSignupForm(userInfo);
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
    request.post({ url: 'http://localhost:5000/signup', json: true, body: userInfo },
      function(err, res, body) {
        if (err || res.statusCode !== 200 && res.statusCode !== 401) {
          AppDispatcher.handleViewAction({
            actionType: LoginConstants.SIGNUP_FAILURE,
            info: {
              success: false,
              description: "Something went wrong"
            }
          });
          return;
        }
        if (res.statusCode === 200) {
          AppDispatcher.handleViewAction({
            actionType: LoginConstants.SIGNUP_SUCCESS,
            info: {
              success: true,
              description: "Check your email to validate your account"
            }
          });
        } else {
          AppDispatcher.handleViewAction({
            actionType: LoginConstants.SIGNUP_FAILURE,
            info: {
              success: false,
              description: body.description
            }
          });
        }
      });
  }
};
