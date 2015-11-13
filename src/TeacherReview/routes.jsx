/**
 * Routes for the client application
 */
var React         = require('react');
var Router        = require('react-router');
var Login         = require('./components/Login/Login.jsx');
var Route         = Router.Route;

/** Routes for the client application */
module.exports    = [
  <Route name="app">
    /** Barebones route so far */
    <Route name="main" path="/" handler={Login}/>
  </Route>
];
