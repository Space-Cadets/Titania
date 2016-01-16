/**
 * Navbar Login Component & Login
 */
var React = require('react');
var Router = require('react-router');

module.exports = React.createClass({
  render: function() {
    return (
      <nav id="In-Navbar">
        <h1 id="Login-Logo">Dartboard</h1>
        <span id="nav-contents">
            <input id="Search-Input" type="text" />
            <button className="pref-btn">Preferences</button>
        </span>
      </nav>
    );
  }
});