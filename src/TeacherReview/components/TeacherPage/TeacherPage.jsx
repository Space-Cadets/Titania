/**
 * Component for Teacher Page View
 */
var React       = require('react');
var Router      = require('react-router');
var Link        = require('react-router').Link;
var request     = require('request');
var DashStore   = require('../../stores/dashStore.js');
var DashActions = require('../../actions/DashActions.js');

// Components
var Navbar      = require('../Shared/NavbarIn.jsx');
var TeacherCard = require('./TeacherCard.jsx');
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
    var query = window.location.pathname.split('/')[2];
    DashActions.loadTeacherPage(query);
  },

  // Fires post-mount, load data here
  componentDidMount: function() {
    DashStore.addChangeListener(this._onChange);
  },

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

    var courses = this.state.courses.map(function(c, i) {
      var hyper = '/course/' + c.course_name;
      return (
        <div key={i}>
          <Link to={hyper}>{c.department} {c.level} {c.course_name}</Link>
        </div>);
    });

    return (<div>
      <Navbar name="Kent"/>
      <div id="content">

        <div id="bio-row">
          <TeacherCard name={this.state.name} rating={this.state.rating} depts={this.state.depts}/>

      {/* (TODO) Make this it's own component once the load map bug is solved */}
          <div className="link-card">
            <div className="Title"> 
              <div className="stump">
                <i className="fa fa-graduation-cap"></i> 
                Courses Taught
              </div>
            </div>
            <div className="contents">{courses}</div>
          </div>

        </div>
        
        {/* (TODO) Get traits logic done
        
        <div id="trait-row-container">
          <div className="row-title">Traits</div>
          <div id="trait-row"></div>
        </div>
        
        */}

        <div id="review-row-container">
          <div className="Title"> 
              <div className="stump"><i className="fa fa-thumbs-o-up"></i> Reviews</div>
          </div>
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
