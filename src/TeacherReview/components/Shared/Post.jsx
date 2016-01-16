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
    return (
      <span className="Post-Button" onClick={this.onClick}>
        {/* we're currently Linking to dashboard, but it should go to the form page*/}
        <Link to="/dashboard"></Link>
        Post a Review
      </span>
    );
  }
});
