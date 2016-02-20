var React = require('React');

var DashActions = require('../../actions/DashActions.js');
var DashStore   = require('../../stores/dashStore.js');

var Star = React.createClass({
	render: function() {
		return (<span className={"fa fa-2x fa-star star-" + this.props.active} onClick={this.onClick}>
			</span>);
	},

	onClick: function(e) {
		console.log(e);
	}
})

module.exports = React.createClass({
	getInitialState: function() {
		return ({rating: 0});
	},

	render: function() {
		// (TODO) all stars below get highligted

		var rating = this.state.rating;

		var stars = [0, 0, 0, 0, 0].map(function(v, i) {
			if (i + 1 <= rating)
				return <Star key={i} active="on" />
			
			return <Star key={i} active="off"/>
		});

		return <div className="star-bar">{stars}</div>;
	}
});