/**
 *  Feed of Course Reviews
 */
var React       = require('react');
var Router      = require('react-router');
var Link        = require('react-router').Link;

var DashStore   = require('../../stores/dashStore.js');
var DashActions = require('../../actions/dashActions.js');

var Review = require('../Shared/Review.jsx');
var FormContainer = require('../SuperForm/FormContainer.jsx');

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
      return (<Review courseName={r.course} date={r.date_created}
        classRating={r.class_rating} instructorRating={r.inst_rating}
        instructorName={r.instructor_name} subject={r.subject}
        crn={r.section_crn} level={r.subject_level} key={i} 
        author={r.student} text={r.text} />);
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
