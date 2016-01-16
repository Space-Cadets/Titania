/**
 * Post Button Component -- Should take you to a typeform type of page
 */
var React = require('react');
var Link  = require('react-router').Link;

module.exports = React.createClass({
  onClick: function() {
    //Do Cool Things -- (turn swag on)
  },
  
  render: function() {
    return (<button id="post-btn">Post a Review</button>);
  }
});
