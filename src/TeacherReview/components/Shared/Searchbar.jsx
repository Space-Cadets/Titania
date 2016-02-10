var React = require('react');

module.exports = React.createClass({
	
	render: function() {
		return (<div id="Search-Container">
			<i className="fa fa-search"></i>
			<input id="Search-Input" placeholder="Search" type="text"></input>
			<select id="Search-Dropdown" defaultValue="Course">
				<option value="Course">Course</option>
				<option value="Instructor">Instructor</option>
			</select>
		</div>);
	}

});