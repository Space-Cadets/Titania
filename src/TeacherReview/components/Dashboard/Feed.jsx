/**
 *  Feed of Course Reviews
 */
var React       = require('react');
var Router      = require('react-router');
var Link        = require('react-router').Link;

var DashStore   = require('../../stores/dashStore.js');
var DashActions = require('../../actions/dashActions.js');

var FormContainer = require('../SuperForm/FormContainer.jsx');
var RecentReview  = React.createClass({
  render: function() {
    return (<div>{this.props.content}</div>);
  }
});

module.exports = React.createClass({
  componentWillMount: function() {
    DashActions.loadRecentReviews();
  },

  getInitialState: function() {
    return ({ reviews: [] });
  },

  componentDidMount: function() {
    DashStore.addChangeListener(this._onChange);
  },

  // Remove change listers from stores
  componentWillUnmount: function() {
    DashStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var reviews = this.state.reviews.map(function(r, i) {
      return (<div key={i}>
        <h4>{r.course} with {r.instructor_name}</h4>
        <p>{r.subject} {r.subject_level} <em>{r.date_created}</em></p>
        <p>{r.text}</p>
      </div>);
    });

    return (
    <div id="feed-container">
      <div className="Title"> 
        <div className="stump">
          <i className="fa fa-bookmark"></i> 
          Recent Reviews
        </div>
      </div>
      <div className="feed-contents">
        {reviews}
        <FormContainer />
      </div>
    </div>);
  },

  debug: function() {
    console.log(this.state);
  },

  _onChange: function() {
    this.setState({
      reviews: DashStore.getRecentReviews()
    });
  }
});
