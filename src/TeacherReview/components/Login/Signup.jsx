/**
 * Component for Signup
 */
var React = require('react');
var Router = require('react-router');
var LoginActions = require('../../actions/LoginActions.js');

module.exports = React.createClass({
  getInitialState() {
    return {
      email: '',
      confirmEmail: '',
      firstName: '',
      lastName: '',
      password: ''
    };
  },
  submit: function() {
    LoginActions.signupUser({
      email: this.state.email,
      confirmEmail: this.state.confirmEmail,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      password: this.state.password
    });
  },

  fnameInput: function(e) {
    if (e.keyCode === 13) {
      this.refs.lname.focus();
    }
    this.setState({
      firstName: e.target.value || ''
    });
  },

  lnameInput: function(e) {
    if (e.keyCode === 13) {
      this.refs.email.focus();
    }
    this.setState({
      lastName: e.target.value || ''
    });
  },

  emailInput: function(e) {
    if (e.keyCode === 13) {
      this.refs.confirmEmail.focus();
    }
    this.setState({
      email: e.target.value || ''
    });
  },

  confirmEmailInput: function(e) {
    if (e.keyCode === 13) {
      this.refs.password.focus();
    }
    this.setState({
      confirmEmail: e.target.value || ''
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
            <h5 id="Login-Signup-Description">Find teachers, rate classes, and more</h5>
            <div className="Login-Signup-Section Login-Signup-Item" id="Login-Signup-Name">
              <input onKeyUp={this.fnameInput} type="text" id="Login-Signup-FName" placeholder="First Name"/>
              <input ref="lname" onKeyUp={this.lnameInput} type="text" id="Login-Signup-LName" placeholder="Last Name"/>
            </div>
            <div className="Login-Signup-Item Login-Signup-Section">
              <input ref="email"
                     onKeyUp={this.emailInput}
                     className="Login-Signup-Item-Full" placeholder="Villanova Email Address" type="text"/>
            </div>
            <div className="Login-Signup-Item Login-Signup-Section">
              <input ref="confirmEmail"
                     onKeyUp={this.confirmEmailInput}
                     className="Login-Signup-Item-Full"
                     placeholder="Re-Enter Villanova Email Address"
                     type="text"/>
            </div>
            <div className="Login-Signup-Item Login-Signup-Section">
              <input ref="password"
                     onKeyUp={this.passwordInput}
                     className="Login-Signup-Item-Full"
                     placeholder="New Password"
                     type="password"/>
            </div>
            <button onClick={this.submit}
                    className="Login-Signup-Section"
                    id="Login-Signup-Button">Sign up for TeacherReview</button>
          </div>
    );
  }
});
