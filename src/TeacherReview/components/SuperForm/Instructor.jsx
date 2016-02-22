var React = require('react');

var DashActions = require('../../actions/DashActions.js');
var FormActions = require('../../actions/FormActions.js');

module.exports = React.createClass({
  getInitialState: function() {
    return ({ active: this.props.active });
  },

  render: function() {
    return (<div className={"instructor-tag tag-" + this.state.active} 
      onClick={this.instructorClick}>{this.props.label}
    </div>);
  },

  instructorClick: function(e) {
    DashActions.setFormInstructor(e.target.innerText);
    FormActions.setCourses(this.props.courses);

    (this.state.active === 'on') ? this.state.active = 'off' : this.state.active = 'on'
  }
});