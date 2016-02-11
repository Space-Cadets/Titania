/**
  Course Card Component -- Displays the Course Information (passed via props)
*/
var React = require('react');

//
module.exports = React.createClass({
  render: function() {
    return (
    <div className="info-card">
      <div className="Title"> 
        <div className="stump"><i className="fa fa-bookmark"></i> Course</div>
      </div>
      <div className="contents">
        <div className="info-title">{this.props.name}</div>
        <div className="info-sect">{this.props.subject} {this.props.level}</div>
        <div className="info-rating">{this.props.rating}</div>
      </div>
    </div>
    );
  }
});
