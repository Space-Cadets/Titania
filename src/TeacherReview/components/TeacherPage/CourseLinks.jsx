var React = require('react');

module.exports = React.createClass({
  onChange: function() {
    console.log(this.props);
  },

  render: function() {
    var contents = this.props.courses.map(function(c, i) {
      return <div key={i}>{c.department} {c.level} – {c.course_name}</div>
    });


    return (
      <div className="link-card">
        <div className="Title"> 
          <div className="stump">
            <i className="fa fa-graduation-cap"></i> 
            Courses Taught
          </div>

          <div>{contents}</div>
        </div>
      </div>
      );
  }
});
