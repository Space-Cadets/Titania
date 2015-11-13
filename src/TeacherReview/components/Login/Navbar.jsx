/**
 * Navbar Component & Login
 */
var React = require('react');
var Router = require('react-router');
var LoginActions = require('../../actions/LoginActions.js');

module.exports = React.createClass({
  render: function() {
    return (
      <nav id="Login-Navbar">
        <h1 id="Login-Logo">
          TeacherReview
        </h1>
        <h5 id="Login-Description">
          | Teacher Reviews Done Right
        </h5>
        <span id="Login-Login">
          <span className="Login-Login-Section">
            <h5 className="Login-Login-Item">Email:</h5>
            <input className="Login-Login-Input"type="text">
          </span>
          <span className="Login-Login-Section">
            <h5 className="Login-Login-Item">Password:</h5>
            <input className="Login-Login-Input" type="password">
          </span>
          <button id="Login-Login-Button">Sign In</button>
        </span>
      </nav>
    );
  }
});
