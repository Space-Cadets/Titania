var React = require('react');

module.exports = React.createClass({

	render: function() {
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
					<div>Department goes here</div>
					<div className="info-rating">{this.props.rating}</div>
				</div>
				
			</div>
		);
	}
});
