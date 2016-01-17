/**
 * Component for Course Page View
 */
var React       = require('react');
var Router      = require('react-router');
var DashStore   = require('../../stores/dashStore.js');
var DashActions = require('../../actions/dashActions.js');

var Navbar      = require('../Shared/NavbarIn.jsx');
var CourseCard  = require('./CourseCard.jsx');
var TeacherLinks = require('./TeacherLinks.jsx');
// var Footer      = require('../Shared/Footer.jsx');

/**
 * Utility functions for Course Page
 */
function getState() {
  return {
    data: DashStore.getData()
  };
}

/**
 * Component
 */
module.exports = React.createClass({

  mixins: [ Router.State ],

  //Implements utility function to get the View Data from store
  getInitialState: function() {
    return getState();
  },

  //Fires before mount
  componentWillMount: function() {

  },

  //Fires post-mount,
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
    return (<div>
      <Navbar />
      <div id="content"> 
        <div id="bio-row">
          <CourseCard />
          <TeacherLinks />
        </div>
        <div id="trait-row">Trait Row</div>
        <div id="review-row">Reviews Row</div>
      </div>
    </div>
    );
  },

  //sets page to rerender on every change
  _onChange: function() {
    this.setState(getState());
  }

});
