var React = require('React');

var FormActions = require('../../actions/FormActions.js');
var FormStore   = require('../../stores/formStore.js');

var Star = React.createClass({
  render: function() {
    if (this.props.active === 'on')
      return (<span className={"fa fa-2x fa-star star-" + this.props.active} 
      onClick={this.onClick}></span>)

    else if (this.props.active === 'off')
      return (<span className={"fa fa-2x fa-star-o star-" + this.props.active} 
      onClick={this.onClick}></span>);
  },

  onClick: function(e) {
    if (this.props.type === 'instructor')
      FormActions.rateInstructor(this.props.num);

    else if (this.props.type === 'course')
      FormActions.rateCourse(this.props.num);
  }
});

function getRating(type) {
  if (type === 'instructor')
    return FormStore.getInstructorRating();

  else if (type === 'course')
    return FormStore.getCourseRating();
}

module.exports = React.createClass({

  getInitialState: function() {
    return ({rating: getRating(this.props.type)});
  },

  componentDidMount: function() {
    FormStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    FormStore.removeChangeListener(this._onChange);
  },

  render: function() {
    // (TODO) all stars below get highligted
    var top = this;

    var stars = [0, 0, 0, 0, 0].map(function(v, i) {
      if (i + 1 <= top.state.rating)
        return <Star key={i} num={i + 1} active="on" type={top.props.type}/>
      
      return <Star key={i} num={i + 1} active="off" type={top.props.type}/>
    });

    return <div className="star-bar">{stars}</div>;
  },

  _onChange: function() {
    this.setState({rating: getRating(this.props.type)})
  }
});