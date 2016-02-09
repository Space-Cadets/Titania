/**
 * Component for Course Page View
 *
 *  TODO: Init AJAX (in ComponentDidMount), Populate TeacherLinks & Card, Setup Store & Actions
 */
var React       = require('react');
var Router      = require('react-router');
var DashStore   = require('../../stores/dashStore.js');
var DashActions = require('../../actions/dashActions.js');

//Components
var Navbar       = require('../Shared/NavbarIn.jsx');
var CourseCard   = require('./CourseCard.jsx');
var TeacherLinks = require('./TeacherLinks.jsx');
var Trait        = require('../Shared/Trait.jsx');
var Review       = require('../Shared/Review.jsx');

//Data
var trait_data = require('../../utils/courseTraits.json');

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

    //get array of trait components
    var traits = trait_data.map(function(trait) {
      return (<Trait traitName={trait.name} count={trait.val} key={trait.name} />);
    });

    //get array of review components
    var reviews = trait_data.map(function(review) {
      return (<Review key={review.name} />);
    });

    return (
      <div>
        <Navbar name="Kent"/>
        <div id="content">
          <div id="bio-row">
            <CourseCard />
            <TeacherLinks />
          </div>
        <div id="trait-row-container">
          <div className="row-title">Traits</div>
            <div id="trait-row">
              {traits}
            </div>
          </div>
        <div id="review-row-container">
          <div className="row-title">Reviews</div>
            <div id="review-row">
              {reviews}
            </div>
          </div>
        </div>
      </div>
    );
  },

  // Sets page to rerender on every change
  _onChange: function() {
    this.setState(getState());
  }

});
