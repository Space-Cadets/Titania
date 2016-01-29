/**
 *	Review Component -- Shows Review Text (passed via props)
 */
var React = require('react');

module.exports = React.createClass({
	render: function() {
		return (
			<div className="review">
				Text goes in Text comes out{/*this.props.reviewText*/}
			</div>
		);
	}
})
