/**
 * Navbar Component & Login
 * TODO: Reshape to better suit the site
 */
var React = require('react');
var Router = require('react-router');
var Link  = Router.Link;
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
        <h1 onClick={this.reload} className="Login-Logo">Dartboard</h1>
        <Link to="/register"
              id="Login-Nav-Button">Sign up</Link>
      </nav>
    );
  }
});
