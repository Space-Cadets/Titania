var React 		   = require('react');
var browserHistory = require('react-router').browserHistory;
var DashActions    = require('../../actions/DashActions.js');

module.exports = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},

	getInitialState: function() {
		return {
			query: '',
			course: true
		};
	},

	onKeyUp: function(e) {
		if (e.keyCode === 13) {
			var type = this.state.course ? "courses" : "instructors";
			
			this.context.router.push({
				pathname: "/results/" + type + "/" + this.state.query
			});

			DashActions.search(this.state.query, type);
		} else {
			this.setState({ query: e.target.value });
		}
	},

	onChange: function() {
		this.setState({
			course: !this.state.course
		});
	},

	onClick: function() {
		var type = this.state.course ? "courses" : "instructors";
		
		this.context.router.push({
			pathname: "/results/" + type + "/" + this.state.query
		});

		DashActions.search(this.state.query, type);
	},

	render: function() {
		return (<div id="Search-Container">
			<span className="fa fa-search icon"></span>
			<input id="Search-Input" onKeyUp={this.onKeyUp} placeholder="Search" type="text"></input>
			<select onChange={this.onChange} id="Search-Dropdown" defaultValue="Course">
				<option value="Course">Course</option>
				<option value="Instructor">Instructor</option>
			</select>
			<button className="btn" onClick={this.onClick}>Go</button>
		</div>);
	}

});
