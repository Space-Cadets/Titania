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

function searchInstructor(term) {
  return {
    results: DashStore.getSearchResults()
  }
}

module.exports = React.createClass({
  getInitialState: function() {
    return ({ query: '', results: [], instructor: null, course: null });
  },

  onKeyUp: function(e) {
    if (e.keyCode === 13) {
      // this.setState(searchInstructor(this.state.query));
      DashActions.search(this.state.query, 'instructors');
    } else {
      this.setState({ query: e.target.value });
    }

    console.log(this.state)
  },

  componentDidMount: function() {
    DashStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    DashStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var fuzzy = this.state.results.map(function(item, i){
      return (<p key={i}>{item.name}</p>);
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
        
        <div id="Section-Container"></div>
        
      </div>
    </div>);
  },

  _onChange: function() {
    this.setState(searchInstructor(this.state.query));
  }

});