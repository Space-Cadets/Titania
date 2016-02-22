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
    return ({ active: this.props.active });
  },

  render: function() {
    return (<div className={"instructor-tag tag-" + this.state.active} onClick={this.onClick} >
      {this.props.label}
    </div>);
  },

  onClick: function() {
    // Clean up -- choose either state or props.
    if (this.state.active === 'off') {
      this.state.active = 'on';
      FormActions.addTrait(this.props.type, this.props.label);
    } else {
      this.state.active = 'off';
      FormActions.removeTrait(this.props.type, this.props.label);
    }
  }
});

module.exports = React.createClass({
  getInitialState: function() {
    return ({ 
      itraits: [], 
      ctraits: [], 
      active_ctraits: DashStore.getCTraits(), 
      active_itraits: DashStore.getITraits(),
    });
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
    var aits = this.state.active_itraits,
        acts = this.state.active_ctraits;

    var itraits = this.state.itraits.map(function(item, i) {
      if (aits.indexOf(item.description) > -1)
        return <Trait label={item.description} key={i} type='instructor' active={'on'} />

      return <Trait label={item.description} key={i} type='instructor' active={'off'} />
    });

    var ctraits = this.state.ctraits.map(function(item, i) {
      if (acts.indexOf(item.description) > -1)
        return <Trait label={item.description} key={i} type='course' active={'on'} />  

      return <Trait label={item.description} key={i} type='course' active={'off'} />
    });

    return (
    <div>
      <div>Instructor Traits</div><div id="Itraits-Container">{itraits}</div>
      <div>Course Traits</div><div id="Ctraits-Container">{ctraits}</div>
    </div>);
  },

  _onChange: function() {
    var bulk = DashStore.getTraits();
    bulk.active_itraits = DashStore.getITraits();
    bulk.active_ctraits = DashStore.getCTraits();
    this.setState(bulk);
  }
});