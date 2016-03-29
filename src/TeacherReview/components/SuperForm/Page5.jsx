var React = require('react');

var FormActions = require('../../actions/FormActions.js');
var FormStore   = require('../../stores/formStore.js');

// Flow
/* 
  1. Simple Y/N save to store on clicks
*/

module.exports = React.createClass({

  render: function() {
    return (
    <div>
      <div>Would you like to post this anonymously?</div>
      <button className="btn" onClick={this.postMe}>Post as me</button>
      <button className="btn" onClick={this.postAnon}>Post anonymously</button>
    </div>);
  },

  postAnon: function() {
    var payload = FormStore.getFullForm();

    var groomed = {
      student: 'test1@villanova.edu',  // (TODO)
      instructor: payload.instructor,
      course: 'TOP: Game Development', // (TODO)
      instRating: payload.istars,
      classRating: payload.cstars,
      reviewBody: payload.review
    };

    FormActions.validateReview(groomed);
    // FormActions.sendReview(groomed);
    // FormActions.clearForm();
  },

  postMe: function() {
    var payload = FormStore.getFullForm();

    var groomed = {
      student: 'test1@villanova.edu',  // (TODO)
      instructor: payload.instructor,
      course: 'TOP: Game Development', // (TODO)
      instRating: payload.istars,
      classRating: payload.cstars,
      reviewBody: payload.review
    };
    
    FormActions.validateReview(groomed);
    // FormActions.sendReview(groomed);
    // FormActions.clearForm();
  }
});