/**
 * Top Level App, Routing is handled from here. Routes manage full page components.
 */
var React       = require('react');
var ReactDOM    = require('react-dom');
var ReactRouter = require('react-router');
var Login       = require('./components/Login/Login.jsx');
var Dashboard   = require('./components/Dashboard/Dashboard.jsx');
var Router      = ReactRouter.Router;
var Route       = ReactRouter.Route;

//run router
ReactDOM.render(<Router>
                  <Route path="/" component={Dashboard}/>
                  <Route path="/login" component={Login}/>
                </Router>, document.getElementById('TeacherReview'));
