/**
 * Component for Login Application
 */
var React        = require('react');
var Router       = require('react-router');
var LoginStore   = require('../../stores/loginStore.js');
var LoginActions = require('../../actions/LoginActions.js');
var Signup       = require('./Signup.jsx');
var Navbar       = require('../Shared/Navbar.jsx');
var Footer       = require('../Shared/Footer.jsx');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
/**
 * Utility functions for Login Application
 */
function getState() {
  return {
    data: LoginStore.getData()
  };
}

/**
 * Component
 */
module.exports = React.createClass({

  mixins: [ Router.State ],

  //Implements utility function to get the View Data from store
  getInitialState: function() {
    return getState();
  },

  //Fires before mount
  componentWillMount: function() {

  },

  //Fires post-mount,
  componentDidMount: function() {
    LoginStore.addChangeListener(this._onChange);
  },

  // Remove change listers from stores
  componentWillUnmount: function() {
    LoginStore.removeChangeListener(this._onChange);
  },

  //fires on every change
  componentDidUpdate: function() {
  },

  renderNotification: function() {
    var notification = this.state.data.signup.notification;
    if (notification.show) {
      return (<div className={notification.success ? "signupSuccess" : "signupFailure"}>{notification.description}</div>);
    }
  },

  render: function() {
    //login view
    return (
      <div id="TeacherReview" className="TeacherReviewSignup">
        <main id="Login-Main">
          <Navbar />
          <Signup />
          {this.renderNotification()}
        </main>
      </div>
    );
  },

  //sets page to rerender on every change
  _onChange: function() {
     this.setState(getState());
  }

});
