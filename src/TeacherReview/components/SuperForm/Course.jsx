var React = require('react');

var DashActions = require('../../actions/DashActions.js');

module.exports = React.createClass({
	getInitialState: function() {
		return ({ active: this.props.active });
	},

  render: function() {
    return (<div className={"course-tag tag-" + this.state.active} 
    	onClick={this.courseClick}>
      {this.props.label}
    </div>);
  },

  courseClick: function(e) {
    DashActions.setFormCourse(e.target.innerText);
    (this.state.active === 'on') ? this.state.active = 'off' : this.state.active = 'on';
  }
});