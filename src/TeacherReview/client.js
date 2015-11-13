/**
 * Top Level App, Routing is handled from here. Routes manage full page components.
 */
var React       = require('react');
var ReactDOM    = require('react-dom');
var ReactRouter = require('react-router');
var Router      = ReactRouter.Router;
var Route       = ReactRouter.Route;
var Login       = require('./components/Login/Login.jsx');

//run router
ReactDOM.render(<Router>
                  <Route path="/" component={Login}/>
                </Router>, document.getElementById('TeacherReview'));
