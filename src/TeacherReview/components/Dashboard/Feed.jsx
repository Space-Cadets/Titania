/**
 *  Feed of Course Reviews -- Utilizes the super duper feed algorithm
 */
var React       = require('react');
var Router      = require('react-router');
var DashStore   = require('../../stores/dashStore.js');
var DashActions = require('../../actions/dashActions.js');
var Link        = require('react-router').Link;

var FormContainer = require('../SuperForm/FormContainer.jsx');

module.exports = React.createClass({
  getInitialState: function() {
    return ({reviews: []})
  },

  render: function() {
    return (
    <div id="feed-container">
      <div className="Title"> 
        <div className="stump">
          <i className="fa fa-bookmark"></i> 
          Feed
        </div>
      </div>
      <div className="feed-contents">
        <FormContainer />
        <div id="Right-Dash-Container">
          <div><Link to="/register">Go to Signup</Link></div>
          <div><Link to="/login">Go to Login</Link></div>
        </div>
      </div>
    </div>);
  }
});
