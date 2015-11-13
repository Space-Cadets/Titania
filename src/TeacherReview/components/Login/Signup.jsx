/**
 * Component for Signup
 */
var React = require('react');
var Router = require('react-router');
var LoginActions = require('../../actions/LoginActions.js');

module.exports = React.createClass({
  render: function() {
    return (
          <div id="Login-Signup">
            <h5 id="Login-Signup-Description">Find teachers, rate classes, and more</h5>
            <div className="Login-Signup-Section Login-Signup-Item" id="Login-Signup-Name">
              <input type="text" id="Login-Signup-FName" placeholder="First Name"/>
              <input type="text" id="Login-Signup-LName" placeholder="Last Name"/>
            </div>
            <div className="Login-Signup-Item Login-Signup-Section">
              <input className="Login-Signup-Item-Full" placeholder="Villanova Email Address" type="text"/>
            </div>
            <div className="Login-Signup-Item Login-Signup-Section">
              <input className="Login-Signup-Item-Full" placeholder="Re-Enter Villanova Email Address" type="text"/>
            </div>
            <div className="Login-Signup-Item Login-Signup-Section">
              <input className="Login-Signup-Item-Full" placeholder="New Password" type="password"/>
            </div>
            <button className="Login-Signup-Section" id="Login-Signup-Button">Sign up for TeacherReview</button>
          </div>
    );
  }
});
