var React = require('react');

var FormActions = require('../../actions/FormActions.js');

module.exports = React.createClass({

  render: function() {
    return (<div className={"instructor-tag tag-" + this.props.active} 
    	onClick={this.courseClick}>{this.props.label}
    </div>);
  },

  courseClick: function(e) {
    FormActions.setFormCourse(e.target.innerText);
  }
});