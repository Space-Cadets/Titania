var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (<div className="option-tag" onClick={this.courseClick}>
      {this.props.label}
    </div>);
  },

  courseClick: function(e) {
    console.log(e.target.innerText, 'selected');
  }
});