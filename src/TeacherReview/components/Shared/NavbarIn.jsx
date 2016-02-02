/**
 * Navbar Login Component & Login -- The One for Dashboard -- Handles Search Input
 */
var React = require('react');
var Router = require('react-router');
var Link = require('react-router').Link;

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
  render: function() {
    return (
      <nav id="In-Navbar">
        <span id="nav-contents">
          <Link to="/" className="Logo-Dash">
            <h1 className="Login-Logo">Dart</h1>
            <h1 className="Login-LogoRight">board</h1>
          </Link>
          <input id="Search-Input" type="text" />
          <span id="Search-btn"><i className="fa fa-search"></i></span>
          <span style={this.state.dropdown ? {"color" : "#ccc"} : {"color" : "black"}}
                onClick={this.toggleDropdown}
                className="pref-btn">
            {this.props.name}
            {this.state.dropdown ? (<span style={{"color": "#ccc"}} id="pref-btn-caret">&#9650;</span>) :
              (<span id="pref-btn-caret">&#9660;</span>)
            }


          </span>
        </span>
      </nav>
    );
  }
});
