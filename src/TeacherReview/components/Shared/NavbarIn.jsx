/**
 * Navbar Login Component & Login -- The One for Dashboard -- Handles Search Input
 */
var React = require('react');
var Router = require('react-router');
var Link = require('react-router').Link;

module.exports = React.createClass({
  toggleDropdown: function() {

  },
  render: function() {
    return (
      <nav id="In-Navbar">
        <span id="nav-contents">
          <Link to="/" className="Logo-Dash">
            <h1 className="Login-Logo">Mandingo</h1>
            <h1 className="Login-LogoRight">net</h1>
          </Link>
          <input id="Search-Input" type="text" />
          <span id="Search-btn"><i className="fa fa-search"></i></span>
          <span onClick={this.toggleDropdown} className="pref-btn">{this.props.name}<span id="pref-btn-caret">&#9660;</span></span>
        </span>
      </nav>
    );
  }
});
