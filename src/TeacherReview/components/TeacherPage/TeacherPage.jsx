/**
 * Component for Teacher Page View
 */
var React       = require('react');
var Router      = require('react-router');
var request     = require('request');
var DashStore   = require('../../stores/dashStore.js');
var DashActions = require('../../actions/dashActions.js');

//Components
var Navbar      = require('../Shared/NavbarIn.jsx');
var TeacherCard = require('./TeacherCard.jsx');
var CourseLinks = require('./CourseLinks.jsx');
var Review      = require('../Shared/Review.jsx');

/**
 * Utility functions for Teacher Page
 */
function getState() {
  return {
    data: DashStore.getData()
  };
}

var opts = {url: 'http://localhost:5000/instructors/Anany Levitin'};

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
      departments: []
    };
  },

  // Fires before mount
  componentWillMount: function() {
    // Should be an action
    // this.serverRequest = request(opts, function (err, head, body) {
    //   body = JSON.parse(body).data;
    //   this.setState({ 
    //     name: body.name,
    //     traits: body.traits,
    //     rating: body.rating,
    //     courses: body.courses,
    //     departments: body.departments[0]
    //   });
    // }.bind(this));
  },

  // Fires post-mount, load data here
  componentDidMount: function() {
    DashStore.addChangeListener(this._onChange);
  },

  // Remove change listers from stores
  componentWillUnmount: function() {
    DashStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return (<div>
      <Navbar name="Kent"/>
      <div id="content"></div>
    </div>
    );
  },

  _onChange: function() {
    console.log('123');
  }
});
