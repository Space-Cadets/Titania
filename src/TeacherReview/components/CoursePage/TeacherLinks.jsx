/**
 *	Link to Teacher Component -- Names of Teachers and Links to them
 */
var React = require('react');

module.exports = React.createClass({

	render: function() {
		var contents = this.props.courses.map(function(c, i) {
			return <div key={i}>{c.department} {c.level} – {c.course_name}</div>
		});

		return (
		<div className="link-card">
			<div className="Title"> 
              <div className="stump">
                <i className="fa fa-graduation-cap"></i> 
                Taught By
              </div>
            </div>
			<div>Prof 1</div>
			<div>Prof 2</div>
			<div>Prof 3</div>
			<div>Prof 4</div>
		</div>
		);
	}
});
