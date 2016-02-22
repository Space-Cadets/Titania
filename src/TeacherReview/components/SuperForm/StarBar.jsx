var React = require('React');

var DashActions = require('../../actions/DashActions.js');
var DashStore   = require('../../stores/dashStore.js');

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
      DashActions.rateInstructor(this.props.num);

    else if (this.props.type === 'course')
      DashActions.rateCourse(this.props.num);
  }
});

function getRating(type) {
  if (type === 'instructor')
    return DashStore.getInstructorRating();

  else if (type === 'course')
    return DashStore.getCourseRating();
}

module.exports = React.createClass({

  getInitialState: function() {
    return ({rating: getRating(this.props.type)});
  },

  componentDidMount: function() {
    DashStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    DashStore.removeChangeListener(this._onChange);
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
    // console.log(getRating(this.props.type));
    this.setState({rating: getRating(this.props.type)})
  }
});