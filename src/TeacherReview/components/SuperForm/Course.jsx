var React = require('react');

var DashActions = require('../../actions/DashActions.js');

module.exports = React.createClass({

  render: function() {
    return (<div className={"instructor-tag tag-" + this.props.active} 
    	onClick={this.courseClick}>{this.props.label}
    </div>);
  },

  courseClick: function(e) {
    DashActions.setFormCourse(e.target.innerText);
  }
});