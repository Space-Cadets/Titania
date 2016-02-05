/**
 * Search Results for Classes / Teachers
 */
var React   = require('react');
var Link    = require('react-router').Link;
var request = require('request').defaults({});
var Result  = require('./Result.jsx');

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
      this.setState({ results: JSON.parse(body)['courses'].slice(0, 8) });
    }.bind(this));
  },

  onClick: function() {
    // Do Cool Things -- (turn swag on)
  },

  render: function() {
  	var res = this.state.results.map(function(r) {
  		return <Result name={r.course_name} type={'course'} />;
    });

    return (<div id="feed-container">Results: {res} </div>);
  }
});
