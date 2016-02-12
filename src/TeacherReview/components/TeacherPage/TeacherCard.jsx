var React = require('react');

module.exports = React.createClass({

  render: function() {
    var dps = (<div></div>);
    
    // Is there a better way to do conditional mapping for props?
    if (this.props.depts) {
      dps = this.props.depts.map(function(d, i) {
        return (<div key={i}>{d.name}</div>);
      });
    }

    return (
      <div className="info-card">
        <div className="Title"> 
          <div className="stump">
            <i className="fa fa-user"></i> 
            Instructor
          </div>
        </div>

        <div className="contents">
          <div className="info-title">{this.props.name}</div>
          <div>{dps}</div>
          <div className="info-rating">{this.props.rating}</div>
        </div>
        
      </div>
    );
  }
});
