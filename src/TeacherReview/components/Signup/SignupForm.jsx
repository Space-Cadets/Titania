/**
 * Component for Signup
 */
var React = require('react');
var Router = require('react-router');
var LoginActions = require('../../actions/LoginActions.js');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      email: '',
      confirmEmail: '',
      name: '',
      password: ''
    };
  },
  submit: function() {
    //split up name
    var firstName;
    var lastName;
    LoginActions.signupUser({
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      password: this.state.password
    });
  },

  nameInput: function(e) {
    if (e.keyCode === 13) {
      this.refs.name.focus();
    }
    this.setState({
      name: e.target.value || ''
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
            <div className="Login-Signup-Section Login-Signup-Item" className="Login-Signup-Section">
              <input id="Login-Signup-Name" onKeyUp={this.nameInput} type="text" className="Login-Signup-Item-Full" placeholder="Your Name"/>
            </div>
            <div className="Login-Signup-Item Login-Signup-Section">
              <input ref="email"
                     id="Login-Signup-Email"
                     onKeyUp={this.emailInput}
                     className="Login-Signup-Item-Full" placeholder="Villanova Email Address" type="text"/>
            </div>
            <div className="Login-Signup-Item Login-Signup-Section">
              <input ref="password"
                     id="Login-Signup-Password"
                     onKeyUp={this.passwordInput}
                     className="Login-Signup-Item-Full"
                     placeholder="New Password"
                     type="password"/>
            </div>
            <button onClick={this.submit}
                    className="Login-Signup-Section"
                    id="Login-Signup-Button">Sign up</button>
          </div>
    );
  }
});
