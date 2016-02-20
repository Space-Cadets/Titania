var React = require('react');

var DashActions = require('../../actions/DashActions.js');

module.exports = React.createClass({
  render: function() {
    return (<div className="instructor-tag" onClick={this.instructorClick}>
      {this.props.label}
    </div>);
  },

  instructorClick: function(e) {
    DashActions.loadTeacherPage(e.target.innerText);
    DashActions.setFormInstructor(e.target.innerText);
    DashActions.setFormCourse('');
  }
});