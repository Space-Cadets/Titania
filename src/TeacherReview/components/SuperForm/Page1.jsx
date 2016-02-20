var React = require('react');

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

function searchInstructor(term) {
  // (TODO) Optimize this 
  var instructor = DashStore.getTeacherPage();

  if (instructor) {
    return {
      results: DashStore.getSearchResults().slice(0, 5),
      sections: DashStore.getTeacherPage().courses
    }
  } else {
    return {
      results: DashStore.getSearchResults().slice(0, 5),
      sections: []
    }
  }
}

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
      DashActions.search(this.state.query, 'instructors');
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
      return <Instructor label={item.name} key={i} />;
    });

    var courses = this.state.sections.map(function(item, i) {
      return <Course label={item.course_name} prof={item} key={i} />;
    });

    return (
    <div>
      <div>
        <div className="input-container"> 
          <input type="text" className="type-input" onKeyUp={this.onKeyUp} 
            placeholder="Search for instructor" />
          <button className="btn padle">
            <span className="fa fa-search icon"></span>
          </button>
        </div>

        <div id="Instructor-Container">{fuzzy}</div>
        
        <div id="Section-Container">{courses}</div>
        
      </div>
    </div>);
  },

  _onChange: function() {
    this.setState(searchInstructor(this.state.query));
  }

});