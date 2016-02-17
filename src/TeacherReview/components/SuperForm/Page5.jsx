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
			<div className="onoffswitch">
			    <input type="checkbox" name="onoffswitch" className="onoffswitch-checkbox" id="myonoffswitch"  onClick={this.onClick} />
			    <label className="onoffswitch-label" htmlFor="myonoffswitch">
			        <span className="onoffswitch-inner"></span>
			        <span className="onoffswitch-switch"></span>
			    </label>
			</div>
		</div>);
	},

	onClick: function() {
		this.setState({choice: !(this.state.choice) })
	}
});