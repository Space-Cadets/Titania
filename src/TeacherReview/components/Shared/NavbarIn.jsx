/**
 * Navbar Login Component & Login -- The One for Dashboard -- Handles Search Input
 */
var React = require('react');
var Router = require('react-router');
var Link = require('react-router').Link;

// Import Dash Actions 
var DashActions = require('../../actions/DashActions.js');

// Import Components
var Searchbar = require('./Searchbar.jsx');


module.exports = React.createClass({
  getInitialState: function() {
    return {
      dropdown: false
    };
  },
  
  componentDidMount: function () {
    //adds listener to click anywhere on page to close dropdown
    document.body.addEventListener('click', this.handleBodyClick);
  },

  componentWillUnmount: function () {
    //removes listener to click anywhere on page to close dropdown
    document.body.removeEventListener('click', this.handleBodyClick);
  },

  handleBodyClick: function() {
    //closes dropdown
    this.setState({
      dropdown: false
    });
  },

  toggleDropdown: function() {
    this.setState({
      dropdown: !this.state.dropdown
    });
  },
  
  fire: function() {
    DashActions.search('Analysis', 'courses');
  },

  render: function() {
    return (
      <nav id="In-Navbar">
        <span id="Nav-Contents">
          <Link to="/" className="Logo-Dash">
            <h1 className="Login-Logo">Dartboard</h1>
          </Link>

          <Searchbar />

          <button id="Review-btn" onClick={this.fire}>
            <i className="fa fa-pencil"></i>&nbsp;
            Post Review
          </button>

          {/* 
          <span style={this.state.dropdown ? {"color" : "#ccc"} : {"color" : "#fff"}}
                onClick={this.toggleDropdown}
                className="pref-btn">
            {this.props.name}
            {this.state.dropdown ? (<span style={{"color": "#ccc"}} id="pref-btn-caret">&#9650;</span>) :
              (<span id="pref-btn-caret">&#9660;</span>)
            }
          </span> 
          */}
        </span>
      </nav>
    );
  }
});
