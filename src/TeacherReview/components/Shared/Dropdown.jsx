/**
 *	Dropdown Component
 */
var React = require('react');

module.exports = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  about: function() {

  },
  help: function() {

  },
  reportProblem: function() {

  },
  settings: function() {

  },
  logout: function() {
    localStorage.accessToken = "";
    window.token = "";
    this.context.router.push("/login");
  },
	render: function() {
		return (
      <div id="Nav-dropdown">
        <div onClick={this.about} className="dropdownbb"><i className="fa fa-info"></i> About</div>
        <div onClick={this.help} className="dropdownbb"><i className="fa fa-question"></i> Help</div>
        <div onClick={this.reportProblem} className="dropdownbb"><i className="fa fa-heartbeat"></i> Report a problem</div>
        <div onClick={this.settings} className="dropdownbb"><i className="fa fa-cog"></i> Settings</div>
        <div onClick={this.logout} className="dropdownbb"><i className="fa fa-sign-out"></i> Logout</div>
      </div>
		);
	}
})
