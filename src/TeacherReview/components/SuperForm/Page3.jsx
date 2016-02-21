var React = require('react');

var DashActions = require('../../actions/DashActions.js');
var FormActions = require('../../actions/FormActions.js');
var DashStore   = require('../../stores/dashStore.js');

/* 
Implement items for this component 

Flow: 
 1. User rates instructor

 2. User rates course

 [3. User changes either]

*/

var Trait = React.createClass({
  getInitialState: function() {
    return ({ active: false });
  },

  render: function() {
    return (<div className="instructor-tag" onClick={this.onClick}>
      {this.props.label}
    </div>);
  },

  onClick: function() {
    console.log(this.state)
    if (!this.state.active) {
      FormActions.addTrait(this.props.type, this.props.label);
      this.state.active = true;
    } else {
      FormActions.removeTrait(this.props.type, this.props.label);
      this.state.active = false;
    }
  }
})

module.exports = React.createClass({
  getInitialState: function() {
    return ({itraits: [], ctraits: []});
  },

  componentWillMount: function() {
    DashActions.getTraits();
  },

  componentDidMount: function() {
    DashStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    DashStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var itraits = this.state.itraits.map(function(item, i) {
      return <Trait label={item.description} key={i} type='Instructor' />
    });

    var ctraits = this.state.ctraits.map(function(item, i) {
      return <Trait label={item.description} key={i} type='course' />
    });

    return (
    <div>
      <div>Instructor Traits</div>
      <div id="Itraits-Container">{itraits}</div>
      <div>Course Traits</div>
      <div id="Ctraits-Container">{ctraits}</div>
    </div>);
  },

  _onChange: function() {
    var bulk = DashStore.getTraits();
    this.setState(bulk);
  }
});