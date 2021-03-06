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
var Dropdown = require('./Dropdown.jsx');


module.exports = React.createClass({
  getInitialState: function() {
    return {
      showDropdown: false
    };
  },

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  onClick: function(e) {
    //manage dropdown clicks
    if (e.target.className !== 'dropdownbb') {
      this.setState({
        showDropdown: !this.state.showDropdown
      });
    }
  },

  dropdownOff: function(e) {
    if (e.target.id !== 'dropdown' && e.target.className !== 'dropdownbb' &&
        e.target.parentNode.className !== 'dropdownbb' && e.target.parentNode.id != 'dropdown') {
      this.setState({
        showDropdown: false
      });
    }
  },

  componentDidMount: function () {
    window.addEventListener('click', this.dropdownOff, false);
  },


  componentWillUnmount: function(){
    window.removeEventListener('click', this.dropdownOff, false);
  },

  renderDropdown: function() {
    if (this.state.showDropdown) {
      return (
        <Dropdown />
      );
    }
  },

  render: function() {
    return (
      <nav id="In-Navbar">
        <span id="Nav-Contents">
          <Link to="/" className="Logo-Dash">
            <h1 className="Login-Logo">
              <span className="fa fa-bell"></span>
              &nbsp;&nbsp;CourseVibe
            </h1>
          </Link>
          <Searchbar />
          <button onClick={this.onClick} id="dropdown" className="btn">
            {this.props.name}&nbsp;
            <i className={this.state.showDropdown ? "fa fa-caret-up" : "fa fa-caret-down"}></i>
          </button>
          {this.renderDropdown()}
        </span>

      </nav>
    );
  }
});
