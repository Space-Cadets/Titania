/**
 *  Review Component -- Shows Review Text (passed via props)
 */
var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <div className="review">

        {/*this.props.crn*/}
        {/*this.props.date*/}
        {/*this.props.level*/}
        {/*this.props.subject*/}

        {/*this.props.courseName*/}
        {/*this.props.instructorName*/}
      
        {/*this.props.classRating*/}
        {/*this.props.instructorRating*/}
        
        {/*this.props.text*/}
        {/*this.props.author ->*/}

        <h4>{this.props.courseName} with {this.props.instructorName}</h4>
        <p>{this.props.subject} {this.props.level} <em>{this.props.date}</em></p>
        <p>{this.props.text}</p>
        
      </div>
    );
  }
})






