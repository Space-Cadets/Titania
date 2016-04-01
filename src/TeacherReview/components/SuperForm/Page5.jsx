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
      traits: [],
      classRating: payload.cstars,
      student: 'anon@villanova.edu',  // (TODO) clear up this email
      instructor: payload.instructor,
      instRating: payload.istars,
    };

    // Todo refactor this
    for (var i in payload.active_ctraits) {
      for (var j in payload.ctraits) {
        if (payload.ctraits[j].description == payload.active_ctraits[i]) { 
          groomed['traits'].push(payload.ctraits[j].id)
          break;
        }
      }
    }

    for (var i in payload.active_itraits) {
      for (var j in payload.itraits) {
        if (payload.itraits[j].description == payload.active_itraits[i]) { 
          groomed['traits'].push(payload.itraits[j].id)
          break;
        }
      }
    }
    
    FormActions.sendReview(groomed);
    FormActions.clearForm();
  },

  postMe: function() {
    var payload = FormStore.getFullForm();
    var user  = DashStore.getData().user;

    var groomed = {
      course: payload.course,
      reviewBody: payload.review,
      traits: [],
      classRating: payload.cstars,
      student: user.email,
      instructor: payload.instructor,
      instRating: payload.istars,
    };

    // Todo refactor this
    for (var i in payload.active_ctraits) {
      for (var j in payload.ctraits) {
        if (payload.ctraits[j].description == payload.active_ctraits[i]) { 
          groomed['traits'].push(payload.ctraits[j].id)
          break;
        }
      }
    }

    for (var i in payload.active_itraits) {
      for (var j in payload.itraits) {
        if (payload.itraits[j].description == payload.active_itraits[i]) { 
          groomed['traits'].push(payload.itraits[j].id)
          break;
        }
      }
    }

    console.log(groomed);
    
    FormActions.sendReview(groomed);
    FormActions.clearForm();
  }
});