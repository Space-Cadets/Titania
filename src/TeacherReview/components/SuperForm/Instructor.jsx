var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (<div className="option-tag" onClick={this.instructorClick}>
      {this.props.label}
    </div>);
  },

  instructorClick: function(e) {
    console.log(e.target.innerText, 'selected');
  }
});