var React = require('react');
var bh = require('react-router').browserHistory;

module.exports = React.createClass({

	onClick: function() {
		if (this.props.type === 'course')
			bh.push('/course/' + this.props.name);
		else
			bh.push('/instructor/' + this.props.name);
	},

	render: function() {
		return (
		<div className="search-result" type={this.props.type} onClick={this.onClick}> 
			<img src="http://localhost:8000/SVG/atom.svg" width="25" height="25" />
			{this.props.name}	
		</div>);
	}
});
