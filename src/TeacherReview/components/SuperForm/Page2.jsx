var React = require('react');
var StarBar = require('./StarBar.jsx');

/* 
Implement items for this component 

Flow: 
 1. User rates instructor

 2. User rates course

 [3. User changes either]

*/
module.exports = React.createClass({
  spaceStyles: {'margin': '25px'},

  colStyle: {
    'display': 'flex',
    'flexDirection': 'column',
    'alignItems': 'center'
  },

	render: function() {
		return (
		<div>
			<div style={this.spaceStyles}>
        <div style={this.colStyle}> Rate Instructor <StarBar type='INS'/></div>
      </div>

      <div style={this.spaceStyles}>
			  <div style={this.colStyle}> Rate Course <StarBar type='COU' className='more'/></div>
      </div>

		</div>);
	}
});