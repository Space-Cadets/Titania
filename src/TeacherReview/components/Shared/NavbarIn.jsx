/**
 * Navbar Login Component & Login
 */
var React = require('react');
var Router = require('react-router');
var Link = require('react-router').Link;

module.exports = React.createClass({
  render: function() {
    return (
      <nav id="In-Navbar">
        <span id="nav-contents">
          <Link to="/"><h1 id="Login-Logo">Dartboard</h1></Link>
          <input id="Search-Input" type="text" />
          <button className="pref-btn">Preferences</button>
        </span>
      </nav>
    );
  }
});