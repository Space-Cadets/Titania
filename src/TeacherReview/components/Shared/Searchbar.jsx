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
			course: false
		};
	},

	onKeyUp: function(e) {
		if (e.keyCode === 13) {
			var type = this.state.course ? "courses" : "instructors";
			if (location.pathname !== '/') {
				DashActions.search(this.state.query, type);
			}
			this.context.router.push({
				pathname: "/results/" + type + "/" + this.state.query
			});
			console.log(this.state.query + " " + type);
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
		if (location.pathname !== '/') {
			DashActions.search(this.state.query, type);
		}
		this.context.router.push({
			pathname: "/results/" + type + "/" + this.state.query
		});
	},

	render: function() {
		return (<div id="Search-Container">
			<span className="fa fa-search icon"></span>
			<select onChange={this.onChange} id="Search-Dropdown" defaultValue="Instructor">
				<option value="Course">Course</option>
				<option value="Instructor">Instructor</option>
			</select>
			<input id="Search-Input" onKeyUp={this.onKeyUp} placeholder="Search" type="text"></input>
			
			<button className="btn" onClick={this.onClick}>Search</button>
		</div>);
	}

});
