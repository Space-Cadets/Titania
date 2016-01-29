/**
 * Trait Component -- Returns a trait for the class (passed via props)
 */
var React = require('react');

module.exports = React.createClass({
	render: function() {
		return (
		<div className='trait'>
			{this.props.traitName}
			<div className="badge">{this.props.count}</div>
		</div>
		);
	}
});
