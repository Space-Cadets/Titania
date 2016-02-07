var React = require('react');

module.exports = React.createClass({
	render: function() {
		var contents = this.props.courses.map(function(c, i) {
			return <div key={i}>{c.department} {c.level} – {c.course_name}</div>
		});

		return <div className="link-card">{contents}</div>;
	}
});
