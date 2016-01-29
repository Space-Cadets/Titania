/**
 *	Link to Teacher Component -- Names of Teachers and Links to them
 */
var React = require('react');

module.exports = React.createClass({
	render: function() {
		return (
		<div className="link-card">
			{/*
				Should Render like this -- or something like it
				this.props.teachers.map{function(teacher) {
				return <div>{teacher.name}<div/>
			}*/}
			<div>Prof 1</div>
			<div>Prof 2</div>
			<div>Prof 3</div>
			<div>Prof 4</div>
		</div>
		);
	}
});
