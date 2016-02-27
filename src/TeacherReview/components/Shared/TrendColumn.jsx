/**
 * Trending Data -- the nastiest reviews yo
 */
var React = require('react');

//Components
var Link  = require('react-router').Link;
var Trending = require('./Trending.jsx');

module.exports = React.createClass({
	render: function() {
		return (
		<div id="trend-column">
			<Trending />
		</div>);
	}

});
