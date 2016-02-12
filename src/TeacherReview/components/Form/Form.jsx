/**
 * Component for Form -- Post a review for a teacher & course
 */

var React       = require('react');
var Router      = require('react-router');
var DashStore   = require('../../stores/dashStore.js');
var DashActions = require('../../actions/dashActions.js');

//Components
var Navbar      = require('../Shared/NavbarIn.jsx');
var Router      = require('react-router').Router;
var Route       = require('react-router').Route;
var Link        = require('react-router').Link;

/**
 * Component
 */
module.exports = React.createClass({
  getInitialState: function() {
    return {
      student: "",
      course: "",
      section: "",
      traits: [],
      classRating: "",
      instRating: "",
      reviewBody: ""
    }
  },
  student: function(e) {
    if (e.keyCode === 13) {
      this.refs.course.focus();
    }
    this.setState({
      student: e.target.value
    });
  },
  course: function(e) {
    if (e.keyCode === 13) {
      this.refs.section.focus();
    }
    this.setState({
      course: e.target.value
    });
  },
  section: function(e) {
    if (e.keyCode === 13) {
      this.refs.traits.focus();
    }
    this.setState({
      section: e.target.value
    });
  },
  traits: function(e) {
    if (e.keyCode === 13) {
      this.refs.classRating.focus();
    }
    this.setState({
      traits: e.target.value.split(" ")
    });
  },
  classRating: function(e) {
    if (e.keyCode === 13) {
      this.refs.instRating.focus();
    }
    this.setState({
      classRating: e.target.value
    });

  },
  instRating: function(e) {
    if (e.keyCode === 13) {
      this.refs.reviewBody.focus();
    }
    this.setState({
      instRating: e.target.value
    });
  },
  reviewBody: function(e) {
    if (e.keyCode === 13) {
      this.submit();
    }
    this.setState({
      reviewBody: e.target.value
    });
  },
  submit: function(){
    console.log(this.state);
    DashActions.sendReview({
      student: this.state.student,
      course: this.state.course,
      section: this.state.section,
      traits: this.state.traits,
      classRating: this.state.classRating,
      instRating: this.state.instRating,
      reviewBody: this.state.reviewBody
    });
  },
  render: function() {
    return (
    <div>
      <Navbar />
      <input onKeyUp={this.student} placeholder="Student Username" ref="student"/>
      <input onKeyUp={this.course} placeholder="course name" ref="course"/>
      <input onKeyUp={this.section} placeholder="section #" ref="section"/>
      <input onKeyUp={this.traits} placeholder="Traits (Leave Empty)" ref="traits"/>
      <input onKeyUp={this.classRating} placeholder="Class Rating (0-5)" ref="classRating"/>
      <input onKeyUp={this.instRating} placeholder="Instructor rating (0-5)" ref="instRating"/>
      <input onKeyUp={this.reviewBody} placeholder="Review Body" ref="reviewBody" />
    </div>
    );
  }

  /*
    {
        'student': 'test1@villanova.edu',
        'course': 'Analysis of Algorithms',
        'section': 32978,
        'traits': [2, 7, 9, 10]
        'classRating': 5,
        'instRating': 5,
        'reviewBody': "This class is awesome you should definitely take it",
    }
  */

});
