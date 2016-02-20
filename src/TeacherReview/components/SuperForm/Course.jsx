var React = require('react');

var DashActions = require('../../actions/DashActions.js');

module.exports = React.createClass({
  render: function() {
    return (<div className="course-tag" onClick={this.courseClick}>
      {this.props.label}
    </div>);
  },

  courseClick: function(e) {
    DashActions.setFormCourse(e.target.innerText);
  }
});