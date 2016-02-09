/**
 * Component for Dashboard -- The Central View to the App
 */

var React       = require('react');
var Router      = require('react-router');
var DashStore   = require('../../stores/dashStore.js');
var DashActions = require('../../actions/dashActions.js');

//Components
var Navbar      = require('../Shared/NavbarIn.jsx');
var Post        = require('../Shared/Post.jsx');
var Footer      = require('../Shared/Footer.jsx');
var TrendColumn = require('../Shared/TrendColumn.jsx');
var Feed        = require('./Feed.jsx');
var Router      = require('react-router').Router;
var Route       = require('react-router').Route;
var Link        = require('react-router').Link;

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

  //Fires post-mount, load data here!
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
    return (
    <div>
      <Navbar name="Kent"/>
      <div id="content-box">
        <Feed />
      </div>
    </div>
    );
  },

  //sets page to rerender on every change
  _onChange: function() {
    this.setState(getState());
  }

});
