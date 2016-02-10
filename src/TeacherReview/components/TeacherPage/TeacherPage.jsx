/**
 * Component for Teacher Page View
 */
var React       = require('react');
var Router      = require('react-router');
var request     = require('request');
var DashStore   = require('../../stores/dashStore.js');
var DashActions = require('../../actions/DashActions.js');

// Components
var Navbar      = require('../Shared/NavbarIn.jsx');
var TeacherCard = require('./TeacherCard.jsx');
var CourseLinks = require('./CourseLinks.jsx');
var Review      = require('../Shared/Review.jsx');

/**
 * Utility functions for Teacher Page
 */
function getState() {
  return {
    data: DashStore.getTeacherPage()
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
      courses: [],
      reviews: [],
      departments: []
    };
  },

  // Fires before mount
  componentWillMount: function() {
    DashActions.loadTeacherPage('Anany Levitin');
  },

  // Fires post-mount, load data here
  componentDidMount: function() {
    DashStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    DashStore.removeChangeListener(this._onChange);
  },

  render: function() {

    // (TODO) Make this its own (sexy) component
    var reviews = this.state.reviews.map(function(r, i) {
      return (<div key={i}>
        <h4>{r.course} with {r.instructor_name}</h4>
        <p>{r.subject} {r.subject_level} <em>{r.date_created}</em></p>
        <p>{r.text}</p>
      </div>)
    });

    return (<div>
      <Navbar name="Kent"/>
      <div id="content">

        <div id="bio-row">
          <TeacherCard name={this.state.name} rating={this.state.rating}/>
          <CourseLinks />
        </div>
        
        {/* 
        <div id="trait-row-container">
          <div className="row-title">Traits</div>
          <div id="trait-row"></div>
        </div>
        */}

        <div id="review-row-container">
          <div className="row-title">Reviews</div>
          <div id="review-row">{reviews}</div>
        </div>

      </div>
    </div>)
  },

  _onChange: function() {
    var payload = getState();
    this.setState({
      depts: payload.data.departments,
      courses: payload.data.courses,
      reviews: payload.data.reviews,
      rating: payload.data.rating, 
      name: payload.data.name
    });
  }
});
