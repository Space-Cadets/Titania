var React = require('react');

var FormActions = require('../../actions/FormActions.js');
var FormStore   = require('../../stores/formStore.js');
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
      <button className="btn" onClick={this.postMe}>Post as me</button>
      <button className="btn" onClick={this.postAnon}>Post anonymously</button>
    </div>);
  },

  postAnon: function() {
    var payload = FormStore.getFullForm();

    var groomed = {
      course: payload.course,
      reviewBody: payload.review,
      traits: [0,1,2,3],
      classRating: payload.cstars,
      student: 'anon@villanova.edu',  // (TODO) clear up this email
      instructor: payload.instructor,
      instRating: payload.istars,
    };
    
    // FormActions.validateReview(groomed);
    FormActions.sendReview(groomed);
    FormActions.clearForm();
  },

  postMe: function() {
    var payload = FormStore.getFullForm();
    var user  = DashStore.getData().user;
    var groomed = {
      course: payload.course,
      reviewBody: payload.review,
      traits: [0,1,2,3],
      classRating: payload.cstars,
      student: user.email,
      instructor: payload.instructor,
      instRating: payload.istars,
    };
    
    console.log(groomed);
    
    // FormActions.validateReview(groomed);
    FormActions.sendReview(groomed);
    FormActions.clearForm();
  }
});