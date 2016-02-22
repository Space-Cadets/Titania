var React = require('react');

var DashActions = require('../../actions/DashActions.js');
var FormActions = require('../../actions/FormActions.js');

module.exports = React.createClass({
  render: function() {
    return (<div className="instructor-tag" onClick={this.instructorClick}>
      {this.props.label}
    </div>);
  },

  instructorClick: function(e) {
    // FormActions.fetchCourses(e.target.innerText);
    DashActions.setFormInstructor(e.target.innerText);
    FormActions.setCourses(this.props.courses);
    console.log(this.props);
  }
});