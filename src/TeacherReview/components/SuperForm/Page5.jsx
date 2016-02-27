var React = require('react');

var DashActions = require('../../actions/DashActions.js');
var FormActions = require('../../actions/FormActions.js');
var DashStore   = require('../../stores/dashStore.js');

// Flow
/* 
  1. Simple Y/N save to store on clicks
*/

module.exports = React.createClass({

  render: function() {
    return (
    <div>
      <div>Would you like to post this anonymously?</div>
      <button className="btn" onClick={this.postAnon}>Post as me</button>
      <button className="btn" onClick={this.postMe}>Post anonymously</button>
    </div>);
  },

  postAnon: function() {
    var payload = DashStore.getFullForm();

    var groomed = {
      student: 'test1@villanova.edu', // (TODO)
      instructor: payload.instructor,
      section: 33000,                 // (TODO)
      instRating: payload.istars,
      classRating: payload.cstars,
      reviewBody: payload.review
    };

    FormActions.sendReview(groomed);
    FormActions.clearForm();
  },

  postMe: function() {
    var payload = DashStore.getFullForm();

    var groomed = {
      student: 'test1@villanova.edu', // (TODO)
      instructor: payload.instructor,
      section: 33000,                 // (TODO)
      instRating: payload.istars,
      classRating: payload.cstars,
      reviewBody: payload.review
    };

    FormActions.sendReview(groomed);
    FormActions.clearForm();
  }
});