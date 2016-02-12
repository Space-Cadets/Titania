var React = require('react');

var DashActions = require('../../actions/DashActions.js');
var DashStore   = require('../../stores/dashStore.js');

/* Implement items for this component 

Flow: 
 1. User types into fuzzy prof finder -> profs returned

 2. User selects the correct prof -> courses returned

 3. User selects course

 [4. If wrong professor, user clears prof, courses are wiped as well]

*/

module.exports = React.createClass({
	getInitialState: function() {
		return ({ instructor: null, course: null });
	},

	render: function() {
		return (<div>Select Instructor, then Select Section (course)</div>);
	}
});