/**
 * Search Results for Classes / Teachers
 */
var React   = require('react');
var Link    = require('react-router').Link;
var request = require('request');
var Result  = require('./Result.jsx');
// Maybe
var DashStore = require('../../stores/dashStore.js');

// Test Query for now
// (TODO) fetch from flux store or URL params
// var opts = {url: 'http://localhost:5000/courses/f/analysis'};

function getSearchState() {
  return {
    results: DashStore.getSearchResults()
  }
}

module.exports = React.createClass({
	getInitialState: function() {
    return {results: []}
  },

  componentDidMount: function() {
    DashStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    DashStore.removeChangeListener(this._onChange);
  },

  render: function() {
  	var res = this.state.results.map(function(r, i) {
      if (r.name)
        return <Result name={r.name} key={i} type={'instructor'} />
      else
  		  return <Result name={r.course_name} key={i} type={'course'} />;
    });

    return (<div id="feed-container">
      <div className="Title"> 
        <div className="stump">
          <i className="fa fa-book"></i> 
          Results
        </div>
      </div>
      <div id="Results-Container">
        {res}
      </div>
    </div>);
  },

  _onChange: function() {
    this.setState(getSearchState());
  }
});
