/**
 * Navbar Component & Login
 * TODO: Reshape to better suit the site
 */
var React = require('react');
var Router = require('react-router');
var LoginActions = require('../../actions/LoginActions.js');

module.exports = React.createClass({
  getInitialState: function() {
    return {email: '', password: ''};
  },

  onClick: function() {
    LoginActions.loginUser(this.state.email, this.state.password);
  },

  onChangeEmail: function(event) {
    this.setState({email: event.target.value});
  },

  onChangePassword: function(event) {
    this.setState({password: event.target.value});
  },

  reload: function() {
    window.location = "/";
  },

  render: function() {
    return (
      <nav id="Login-Navbar">
          <h1 onClick={this.reload} className="Login-Logo">
            Dartboard
          </h1>
        <h5 id="Login-Description">
          | Teacher Reviews (if ya know what I mean)
        </h5>
        <span id="Login-Login">
          <span className="Login-Login-Section">
            <h5 className="Login-Login-Item">Email:</h5>
            <input className="Login-Login-Input"type="text" onChange={this.onChangeEmail}/>
          </span>
          <span className="Login-Login-Section">
            <h5 className="Login-Login-Item">Password:</h5>
            <input className="Login-Login-Input" type="password" onChange={this.onChangePassword}/>
          </span>
          <button id="Login-Login-Button" onClick={this.onClick}>Sign In</button>
        </span>
      </nav>
    );
  }
});
