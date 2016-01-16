/**
 * Component for Dashboard Application
 */
var React       = require('react');
var Router      = require('react-router');
var DashStore   = require('../../stores/dashStore.js');
var DashActions = require('../../actions/dashActions.js');
//var Signup      = require('./Signup.jsx');
var Navbar      = require('../Shared/NavbarIn.jsx');
var Footer      = require('../Shared/Footer.jsx');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;

/**
 * Utility functions for Dashboard Application
 */
function getState() {
  return {
    data: DashStore.getData()
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
    DashStore.addChangeListener(this._onChange);
  },

  // Remove change listers from stores
  componentWillUnmount: function() {
    DashStore.removeChangeListener(this._onChange);
  },

  //fires on every change
  componentDidUpdate: function() {
  },

  render: function() {
    return (<div>
      <Navbar />
      <p>Hi this is the Dashboard</p>
      <Link to="/login">Go to Login</Link>
      <Link to="/CoursePage/1">Go to Course 1</Link>
      <Link to="/TeacherPage/1">Go to Teacher 1</Link>
    </div>);
  },

  //sets page to rerender on every change
  _onChange: function() {
    this.setState(getState());
  }

});
