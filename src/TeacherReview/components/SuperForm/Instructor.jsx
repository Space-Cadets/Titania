var React = require('react');

var DashActions = require('../../actions/DashActions.js');
var FormActions = require('../../actions/FormActions.js');

module.exports = React.createClass({

  render: function() {
    return (<div className={"instructor-tag tag-" + this.props.active} 
      onClick={this.instructorClick}>{this.props.label}
    </div>);
  },

  instructorClick: function(e) {
    DashActions.setFormInstructor(e.target.innerText); // Set Form Instuctor
    DashActions.setFormCourse(null);                   // Clear Form ection
    FormActions.setCourses(this.props.courses);        // Set section options
  }
});