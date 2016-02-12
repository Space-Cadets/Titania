/**
 * Component for Signup
 */
var React        = require('react');
var Router       = require('react-router');
var Link         = Router.Link;
var LoginActions = require('../../actions/LoginActions.js');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      email: '',
      password: ''
    };
  },
  submit: function() {
    this.setState({
      email: this.refs.email.value,
      password: this.refs.password.value
    }, function() {
      if (this.state.password && this.state.email) {
        LoginActions.loginUser({
          username: this.state.email,
          password: this.state.password
        });
      }
    });
  },

  emailInput: function(e) {
    if (e.keyCode === 13) {
      this.refs.password.focus();
    }
    this.setState({
      email: e.target.value || ''
    });
  },

  passwordInput: function(e) {
    if (e.keyCode === 13) {
      this.submit();
    }
    this.setState({
      password: e.target.value || ''
    });
  },


  render: function() {
    return (
          <div id="Login-Signup">
            <h1 id="Login-Signup-Title">Dartboard</h1>
            <h5 id="Login-Signup-Description">Find teachers, rate classes, and more</h5>
            <div className="Login-Signup-Item Login-Signup-Section">
              <input ref="email"
                     id="Login-Login-Email"
                     onKeyUp={this.emailInput}
                     className="Login-Signup-Item-Full" placeholder="Villanova Email Address" type="text"/>
            </div>
            <div className="Login-Signup-Item Login-Signup-Section">
              <input ref="password"
                     id="Login-Signup-Password"
                     onKeyUp={this.passwordInput}
                     className="Login-Signup-Item-Full"
                     placeholder="Password"
                     type="password"/>
            </div>
            {this.props.notification}
            <button onClick={this.submit}
                    className="Login-Signup-Section"
                    id="Login-Login-Button">Sign in</button>
          </div>
    );
  }
});
