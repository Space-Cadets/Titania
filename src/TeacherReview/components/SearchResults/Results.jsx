/**
 * Search Results for Classes / Teachers
 */
var React   = require('react');
var Link    = require('react-router').Link;
var request = require('request');
var Result  = require('./Result.jsx');

// Test Query for now 
// (TODO) fetch from flux store or URL params
opts = {url: 'http://localhost:5000/courses/f/analysis'};

module.exports = React.createClass({
	getInitialState: function() {
    return {
      query: window.location,
      results: [],
      type: ''
    };
  },

  componentDidMount: function() {
  	this.serverRequest = request(opts, function (err, head, body) {
      this.setState({ results: JSON.parse(body)['data'].slice(0, 8) });
    }.bind(this));
  },

  render: function() {
  	var res = this.state.results.map(function(r, i) {
  		return <Result name={r.course_name} key={i} type={'course'} />;
    });

    return (<div id="feed-container">Results: {res} </div>);
  }
});
