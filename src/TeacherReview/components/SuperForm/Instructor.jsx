var React = require('react');

var FormActions = require('../../actions/FormActions.js');

module.exports = React.createClass({

  render: function() {
    return (<div className={"instructor-tag tag-" + this.props.active} 
      onClick={this.instructorClick}>{this.props.label}
    </div>);
  },

  instructorClick: function(e) {
    FormActions.setFormInstructor(e.target.innerText); // Set Form Instuctor
    FormActions.setFormCourse(null);                   // Clear Form ection
    FormActions.setCourses(this.props.courses);        // Set section options
  }
});