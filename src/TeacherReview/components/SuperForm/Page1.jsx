var React = require('react');

var FormActions = require('../../actions/FormActions.js');
var DashActions = require('../../actions/DashActions.js');
var DashStore   = require('../../stores/dashStore.js');

var Instructor  = require('./Instructor.jsx');
var Course      = require('./Course.jsx');
/* Implement items for this component 

Flow: 
 1. User types into fuzzy prof finder -> profs returned

 2. User selects the correct prof -> courses returned

 3. User selects course

 [4. If wrong professor, user clears prof, courses are wiped as well]

*/

module.exports = React.createClass({
  getInitialState: function() {
    return ({ 
      query: '', 
      results:  [], 
      sections: [],
      course: null, 
      instructor: null });
  },

  onKeyUp: function(e) {
    // (Bug) Store maintains teacher course sections so they will show up if
    // you navigate from the teacher page to review
    if (e.keyCode === 13) {
      FormActions.fuzzyReviewSearch(this.state.query);
    } else {
      this.setState({ query: e.target.value });
    }
  },

  componentDidMount: function() {
    DashStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    DashStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var fuzzy = this.state.results.map(function(item, i) {
      return <Instructor label={item.name} key={i} courses={item.courses}/>;
    });

    var courses = this.state.sections.map(function(item, i) {
      return <Course label={item.course_name} prof={item} key={i} />;
    });

    return (
    <div style={{'width': '100%'}}>
      <div>
        <div className="input-container"> 
          <input className="type-input" type="text" onKeyUp={this.onKeyUp} 
            placeholder="Search for instructor" />
          <button className="btn padle" onClick={this.onClick}>
            <span className="fa fa-search icon"></span>
          </button>
        </div>

        <div id="Instructor-Container">{fuzzy}</div>
        
        <div id="Section-Container">{courses}</div>
        
      </div>
    </div>);
  },

  onClick: function() {
    FormActions.fuzzyReviewSearch(this.state.query);
  },

  _onChange: function() {
    this.setState({
      results: DashStore.getFuzzyReviewSearch().slice(0, 5),
      sections: DashStore.getFormCourses() || []
    });
  }

});