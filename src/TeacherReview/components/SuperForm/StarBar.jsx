var React = require('React');

var DashActions = require('../../actions/DashActions.js');
var DashStore   = require('../../stores/dashStore.js');

var Star = React.createClass({
	render: function() {
		return (<span className={"fa fa-2x fa-star star-" + this.props.active} onClick={this.onClick}>
			</span>);
	},

	onClick: function(e) {
		// A hack
		var parent = e.target.parentElement.parentElement;
		
		if (parent.innerText.indexOf('Instructor') > -1)
			DashActions.rateInstructor(this.props.num);
		else if (parent.innerText.indexOf('Course') > -1)
			DashActions.rateCourse(this.props.num);
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
				return <Star key={i} num={i + 1} active="on" />
			
			return <Star key={i} num={i + 1} active="off"/>
		});

		return <div className="star-bar">{stars}</div>;
	}
});