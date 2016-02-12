/**
 * Component for Course Page View
 */
var React       = require('react');
var Router      = require('react-router');
var DashStore   = require('../../stores/dashStore.js');
var DashActions = require('../../actions/dashActions.js');

// Components
var Navbar       = require('../Shared/NavbarIn.jsx');
var CourseCard   = require('./CourseCard.jsx');

// var TeacherLinks = require('./TeacherLinks.jsx');
// var Trait        = require('../Shared/Trait.jsx');
// var Review       = require('../Shared/Review.jsx'); 

/**
 * Utility functions for Course Page
 */
function getState() {
  return {
    data: DashStore.getCoursePage()
  };
}

/**
 * Component
 */
module.exports = React.createClass({

  mixins: [ Router.State ],

  //Implements utility function to get the View Data from store
  getInitialState: function() {
    return {
      name: '',
      rating: 0,
      traits: [],
      reviews: [],
      instructors: [],
      subject: '',
      subject_level: ''
    };
  },

  //Fires before mount
  componentWillMount: function() {
    // (TODO) Check for edge cases
    var query = window.location.pathname.split('/')[2];
    DashActions.loadCoursePage(query);
  },

  //Fires post-mount, this is where we load data!
  componentDidMount: function() {
    DashStore.addChangeListener(this._onChange);
  },

  // Remove change listers from stores
  componentWillUnmount: function() {
    DashStore.removeChangeListener(this._onChange);
  },

  //fires on every change
  componentDidUpdate: function() {
  },

  render: function() {

    // Get array of review components
    var reviews = this.state.reviews.map(function(r, i) {
      return (
        <div key={i}>
          <h4>{r.course} with {r.instructor_name}</h4>
          <p>{r.subject} {r.subject_level} <em>{r.date_created}</em></p>
          <p>{r.text}</p>
        </div>
      );
    });

    var instructors = this.state.instructors.map(function(ins, i) {
      return <div key={i}>{ins.name} {ins.rating}</div>
    });

    return (
      <div>
        <Navbar name="Kent"/>
        <div id="content">
          <div id="bio-row">
            <CourseCard name={this.state.name} subject={this.state.subject} 
              rating={this.state.rating} level={this.state.level} />
            {/* <TeacherLinks instructors={this.state.instructors} />*/}
            <div className="link-card">
              <div className="Title"> 
                <div className="stump">
                  <i className="fa fa-graduation-cap"></i> 
                  Taught By
                </div>
              </div>
              <div className="contents">
              {instructors}
              </div>
            </div>
          </div>

          {/*
          <div id="trait-row-container">
            <div className="row-title">Traits</div>
            <div id="trait-row"></div>
          </div>
          */}

          <div id="review-row-container">
              <div className="Title"> 
                  <div className="stump">
                    <i className="fa fa-thumbs-o-up"></i> 
                    Reviews
                  </div>
              </div>
              <div id="review-row">{reviews}</div>
            </div>
          </div>
      </div>
    );
  },

  // Sets page to rerender on every change
  _onChange: function() {
    var payload = getState();

    this.setState({
      instructors: payload.data.instructors,
      courses: payload.data.courses,
      reviews: payload.data.reviews,
      subject: payload.data.subject,
      level: payload.data.subject_level,
      rating: payload.data.rating, 
      name: payload.data.name
    });
  }

});
