var React       = require('react');
var Router      = require('react-router');
var DashStore   = require('../../stores/dashStore.js');
var DashActions = require('../../actions/dashActions.js');
var Link  = require('react-router').Link;

var Link = require('react-router').Link;

module.exports = React.createClass({
	render: function() {
		return (<div id="feed-container"> 
			<h2>Feed</h2>
			<div><Link to="/login">Go to Login</Link></div>
      <div><Link to="/CoursePage/1">Go to Course 1</Link></div>
      <div><Link to="/TeacherPage/1">Go to Teacher 1</Link></div>
		</div>);	
	}
})