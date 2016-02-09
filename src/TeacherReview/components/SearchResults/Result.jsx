var React = require('react');
var bh = require('react-router').browserHistory;

module.exports = React.createClass({

	onClick: function() {
		bh.push('/courses/' + this.props.name);
	},

	render: function() {
		return (
		<div className="search-result" type={this.props.type} onClick={this.onClick}> 
			<img src="SVG/atom.svg" width="25" height="25" />
			{this.props.name}	
		</div>);
	}
});
