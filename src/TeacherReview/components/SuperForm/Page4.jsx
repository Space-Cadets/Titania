var React = require('react');

var DashActions = require('../../actions/DashActions.js');
var FormActions = require('../../actions/FormActions.js');
var DashStore   = require('../../stores/dashStore.js')

// Flow

/*

  1. User types in content -- save to store on next or prev action

*/

module.exports = React.createClass({
  // (TODO) move to CSS instead of React inline styles
  divStyle: { 
    'width': '80%', 
    'display': 'flex', 
    'flexDirection': 'column',
    'alignItems': 'center' 
  },

  textStyle: {
    'width': '100%',
    'fontSize': '16px',
    'minHeight': '120px',
    'marginTop': '10px'
  },

  // getInitialState: function() {
  //   return ({ text: DashStore.getReviewText() });
  // },

  // onComponentMount: function() {
  //   this.setState({ text: DashStore.getReviewText() })
  // },

  onType: function(e) {
    this.setState({text: e.target.value});
    FormActions.addReviewText(e.target.value);
  },

  render: function() {
    return (
      <div style={this.divStyle}>
        <div className="prompt"> Write a little here</div>
        <textarea style={this.textStyle} onKeyUp={this.onType}></textarea>
      </div>);
  },
});
