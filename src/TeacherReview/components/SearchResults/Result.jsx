var React = require('react');

module.exports = React.createClass({
	render: function() {
		return (<div className="search-result" type={this.props.type}> 
			<img src="SVG/atom.svg" width="25" height="25" />
			{this.props.name}	
		</div>);
	}
});
