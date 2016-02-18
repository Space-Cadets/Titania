/**
 * Component for Searching Courses -- Wraps the Results, and handles input
 */
var React          = require('react');
var Router         = require('react-router');

//Components
var DashStore      = require('../../stores/dashStore.js');
var DashActions    = require('../../actions/dashActions.js');
var Navbar         = require('../Shared/NavbarIn.jsx');
var TrendColumn    = require('../Shared/TrendColumn.jsx');
var Results        = require('./Results.jsx');

/**
 * Utility functions for Search Results Page
 */
function getState() {
  return {
    data: DashStore.getSearchResults()
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

  //Fires post-mount,
  componentDidMount: function() {
    DashStore.addChangeListener(this._onChange);
    DashActions.search(this.props.params.query, this.props.params.type);
  },

  // Remove change listers from stores
  componentWillUnmount: function() {
    DashStore.removeChangeListener(this._onChange);
  },

  //rerender on different route
  routerWillLeave: function() {
    return true;
  },

  //fires on every change
  componentDidUpdate: function() {
  },

  render: function() {
    return (<div>
      <Navbar />
      <div id="content-box">
        <Results />
      </div>
    </div>);
  },

  //sets page to rerender on every change
  _onChange: function() {
    this.setState(getState());
  }

});
