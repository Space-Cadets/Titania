var React = require('react');

// Flow
/* 
	1. Simple Y/N save to store on clicks
*/

module.exports = React.createClass({
	getInitialState: function() {
		return ({ choice: false })
	},

	render: function() {
		return (
		<div>
			<div>Would you like to post this anonymously?</div>
			<button className="btn" onClick={this.postAnon}>Post as me</button>
			<button className="btn" onClick={this.postMe}>Post anonymously</button>
		</div>);
	},

	postAnon: function() {
		console.log('Anon');
	},

	postMe: function() {
		console.log('Me');
	}
});