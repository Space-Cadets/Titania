var React = require('react');

module.exports = React.createClass({
	
	render: function() {
		return (<div id="Search-Container">
			<i className="fa fa-search"></i>
			<input id="Search-Input" placeholder="Search" type="text"></input>
		</div>);
	}

});