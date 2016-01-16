var React = require('react');
var Link  = require('react-router').Link;
var PostButton = require('./Post.jsx');
var Trending = require('./Trending.jsx');

module.exports = React.createClass({
	render: function() {
		return (
		<div id="trend-column">
			<PostButton />
			<Trending />
		</div>
		);
	}

});