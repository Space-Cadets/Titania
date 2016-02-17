var React = require('react');

// Flow

/* 

	1. User types in content -- save to store on next or prev action

*/

module.exports = React.createClass({
	divStyle: {
		'width': '80%' 
	},


	textStyle: {
		'width': '100%',
		'fontSize': '15px'
	},

	render: function() {
		return (
			<div style={this.divStyle}>
				<div className="prompt"> Write a little here</div>
				<br />
				<textarea style={this.textStyle}></textarea>
			</div>);
	}
});