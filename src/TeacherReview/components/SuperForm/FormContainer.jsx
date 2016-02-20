var React = require('react');

// Pages for SuperForm
var Page1 = require('./Page1.jsx');
var Page2 = require('./Page2.jsx');
var Page3 = require('./Page3.jsx');
var Page4 = require('./Page4.jsx');
var Page5 = require('./Page5.jsx');
var Page6 = require('./Page6.jsx');


module.exports = React.createClass({
	getInitialState: function() {
		return ({curr: 0});
	},

	mapper: [
		<Page1 />, <Page2 />, <Page3 />,
		<Page4 />, <Page5 />
	],

	next_page: function() {
		if (this.state.curr + 1 < this.mapper.length)
			this.setState({curr: this.state.curr + 1 });
	},

	prev_page: function() {
		if (this.state.curr - 1 > -1)
			this.setState({curr: this.state.curr - 1});
	},

	render: function() {
		var partial = this.mapper[this.state.curr];

		return (
		<div id="Super-Form">
			<div id="Screen">{partial}</div>
			<div id="Form-Controller">
				<button className="btn" onClick={this.prev_page}>
					<span className="fa fa-arrow-left"></span>
					&nbsp;Previous
				</button>
				<button className="btn" onClick={this.next_page}>
					Next &nbsp;
					<span className="fa fa-arrow-right"></span>
				</button>
			</div>
		</div>);
	}
})