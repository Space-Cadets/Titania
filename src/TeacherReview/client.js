/**
 * Top Level App, Routing is handled from here. Routes manage full page components.
 */
var React          = require('react');
var ReactDOM       = require('react-dom');
var ReactRouter    = require('react-router');

var Signup         = require('./components/Signup/Signup.jsx');
var Login          = require('./components/Login/Login.jsx');
var Dashboard      = require('./components/Dashboard/Dashboard.jsx');
var SearchResults  = require('./components/SearchResults/SearchResults.jsx');
var TeacherPage    = require('./components/TeacherPage/TeacherPage.jsx');
var CoursePage     = require('./components/CoursePage/CoursePage.jsx');
var Form           = require('./components/Form/Form.jsx');

var browserHistory = ReactRouter.browserHistory;
var Router         = ReactRouter.Router;
var Route          = ReactRouter.Route;

//run router
ReactDOM.render(<Router history={browserHistory}>
                  <Route path="/" component={Dashboard} />
                  <Route path="/register" component={Signup} />
                  <Route path="/login" component={Login} />
                  <Route path="/instructor/*" component={TeacherPage} />
                  <Route path="/course/*" component={CoursePage} />
                  <Route path="/results/:type/:query" component={SearchResults} />
                  <Route path="/form" component={Form} />
                </Router>, document.getElementById('TeacherReview'));
