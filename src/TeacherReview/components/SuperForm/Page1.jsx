var React = require('react');

var FormActions = require('../../actions/FormActions.js');
var FormStore   = require('../../stores/formStore.js');

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
    var load = FormStore.getFullForm();

    return ({ 
      query:      '', 
      results:    load.fuzzy.slice(0,5) || [], 
      sections:   load.courses          || [],
      course:     load.course           || null, 
      instructor: load.instructor       || null 
    });
  },

  onKeyUp: function(e) {
    if (e.keyCode === 13) {
      FormActions.fuzzyReviewSearch(this.state.query);
    } else {
      this.setState({ query: e.target.value });
    }
  },

  componentDidMount: function() {
    FormStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    FormStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var ts = this.state;

    var fuzzy = ts.results.map(function(item, i) {
      var toggle = (item.name === ts.instructor) ? 'on': 'off';

      return <Instructor key={i} active={toggle} label={item.name} courses={item.courses}/>;
    });

    var courses = ts.sections.map(function(item, i) {
      var toggle = (item.course_name === ts.course) ? 'on': 'off';

      return <Course key={i} active={toggle} label={item.course_name} prof={item} />
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
    var load = FormStore.getFullForm();
    this.setState({
      results: FormStore.getFuzzyReviewSearch().slice(0, 5),
      sections:   load.courses             || [],
      course:     load.course              || null, 
      instructor: load.instructor          || null 
    });   
  }

});