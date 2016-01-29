var React = require('react');

module.exports = React.createClass({
	render: function() {
		return (
		<div className="link-card">
			{/*
				Should Render like this -- or something like it
				this.props.courses.map{function(course) {
				return <div>{course.name}<div/>
			}*/}
			<div>Class 1</div>
			<div>Class 2</div>
			<div>Class 3</div>
			<div>Class 4</div>
		</div>
		);
	}
});
