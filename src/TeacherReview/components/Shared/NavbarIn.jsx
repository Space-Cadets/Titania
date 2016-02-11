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
        </span>
      </nav>
    );
  }
});
