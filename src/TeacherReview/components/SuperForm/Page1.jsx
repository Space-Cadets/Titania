var React = require('react');

var DashActions = require('../../actions/DashActions.js');
var DashStore   = require('../../stores/dashStore.js');

/* Implement items for this component 

Flow: 
 1. User types into fuzzy prof finder -> profs returned

 2. User selects the correct prof -> courses returned

 3. User selects course

 [4. If wrong professor, user clears prof, courses are wiped as well]

*/

module.exports = React.createClass({
  getInitialState: function() {
    return ({ query: null, instructor: null, course: null });
  },

  onKeyUp: function(e) {
    if (e.keyCode === 13) {
      DashActions.search(this.state.query, 'instructors');
    } else {
      this.setState({ query: e.target.value });
    }
  },

  render: function() {
    return (
    <div>
      <div>
        <div className="input-container"> 
          <input type="text" className="type-input" onKeyUp={this.onKeyUp} 
            placeholder="Search for instructor" />
          <button className="btn padle" onClick={this.search}>
            <span className="fa fa-search icon"></span>
          </button>
        </div>

        <div id="Instructor-Container"></div>
        
        <div id="Section-Container"></div>
        
      </div>
    </div>);
  },

  search: function() {
    DashActions.search(this.state.query, 'instructors');
  }
});