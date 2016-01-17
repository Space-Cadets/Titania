var React = require('react');

module.exports = React.createClass({
	render: function() {
		return (
		<div className="info-card">
			<div className="info-pic">IMG -or- ICON</div>
			<div className="info-title">Course Name</div>
			<div className="info-sect">Course Dept.</div>
			<div className="info-rating">Rating Component</div>
		</div>
		);
	}
});