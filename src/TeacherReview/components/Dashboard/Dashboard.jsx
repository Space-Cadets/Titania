/**
 * Component for Dashboard Application
 */
var React       = require('react');
var Router      = require('react-router');
var dashStore   = require('../../stores/dashStore.js');
var DashActions = require('../../actions/dashActions.js');
var Signup      = require('./Signup.jsx');
var Navbar      = require('./Navbar.jsx');
var Footer      = require('../Shared/Footer.jsx');

/**
 * Utility functions for Dashboard Application
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

  render: function() {
    //login view
    return (
    );
  },

  //sets page to rerender on every change
  _onChange: function() {
  this.setState(getState());
  }

});
