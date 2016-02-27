/**
 *  Review Component -- Shows Review Text (passed via props)
 */
var React  = require('react');
var Router = require('react-router');
var Link   = require('react-router').Link;

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

        <h4>
            <Link to={'/course/' + this.props.courseName}>
                {this.props.courseName}
            </Link> 
            &nbsp;with&nbsp;
            <Link to={'/instructor/' + this.props.instructorName}>
                 {this.props.instructorName}
            </Link>
        </h4>
        <p>{this.props.subject} {this.props.level} <em>{this.props.date}</em></p>
        <p>Course Rating: {this.props.classRating}</p>
        <p>Instructor Rating: {this.props.instructorRating}</p>
        <p>{this.props.text}</p>
        
      </div>
    );
  }
})






