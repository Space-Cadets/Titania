/**
 * Tag Component
 *
 * takes optional props for the number -- but '0' is a falsey value, so the
 * usual ternary statement could be problematic.
 */
var React = require('react');

module.exports = React.createClass({
  tagNumber: function() {
    if (this.props.tagNumber) {
      return (<span className="Tag-Number">{this.props.tagNumber}</span>);
    } else if (typeof this.props.tagNumber !== 'undefined') {
      return (<span className="Tag-Number">0</span>);
    }
  },
  render: function() {
    return (
      <span className="Tag">
        <span className="Tag-Content"></span>
        {tagNumber()}
      </span>
    );
  }
});
