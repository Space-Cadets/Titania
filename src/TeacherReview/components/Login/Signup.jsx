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
      firstName: '',
      lastName: '',
      password: ''
    };
  },
  submit: function() {
    LoginActions.signupUser({
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      password: this.state.password
    });
  },

  firstNameInput: function(e) {
    if (e.keyCode === 13) {
      this.refs.firstName.focus();
    }
    this.setState({
      firstName: e.target.value || ''
    });
  },

  lastNameInput: function(e) {
    if (e.keyCode === 13) {
      this.refs.lastName.focus();
    }
    this.setState({
      lastName: e.target.value || ''
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
              <input id="Login-Signup-FirstName" onKeyUp={this.lastNameInput} type="text" className="Login-Signup-Item-Full" placeholder="First Name"/>
              <input id="Login-Signup-LastName" onKeyUp={this.firstNameInput} type="text" className="Login-Signup-Item-Full" placeholder="Last Name"/>
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
                    id="Login-Signup-Button">Sign up for TeacherReview</button>
          </div>
    );
  }
});
