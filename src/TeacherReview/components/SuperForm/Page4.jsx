var React = require('react');

// Flow

/* 

	1. User types in content -- save to store on next or prev action

*/

module.exports = React.createClass({
	render: function() {
		return (
			<div>
			<div className="prompt"> Write a little here</div>
			<br />
			<textarea></textarea></div>);
	}
});