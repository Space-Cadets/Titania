var React = require('react');

module.exports = React.createClass({
	render: function() {
		return (
			<div className="info-card">
				<div className="info-pic">IMG -or- ICON {/*this.props.infoPic*/}</div>
				<div className="info-title">Teacher Name {/*this.props.courseName*/}</div>
				<div className="info-sect">Teacher Dept. {/*this.props.courseDept*/}</div>
				<div className="info-rating">Rating Component {/* this.props.rating */}</div>
			</div>
		);
	}
});
