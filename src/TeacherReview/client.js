/**
 * Top Level App, Routing is handled from here. Routes manage full page components.
 */
var React         = require('react');
var ReactDOM      = require('react-dom');
var ReactRouter   = require('react-router');
var Login         = require('./components/Login/Login.jsx');
var Dashboard     = require('./components/Dashboard/Dashboard.jsx');
var SearchResults = require('./components/SearchResults/SearchResults.jsx');
var TeacherPage   = require('./components/TeacherPage/TeacherPage.jsx');
var CoursePage    = require('./components/CoursePage/CoursePage.jsx');
var history       = require('history/lib/createBrowserHistory');

var Router      = ReactRouter.Router;
var Route       = ReactRouter.Route;

// <Router history={history()} />
//run router
ReactDOM.render(<Router >
                  <Route path="/login" component={Login} />
                  <Route path="/" component={Dashboard} />
                  <Route path="/TeacherPage/*" component={TeacherPage} />
                  <Route path="/CoursePage/*" component={CoursePage} />
                  <Route path="/results/*/*" component={SearchResults} />
                </Router>, document.getElementById('TeacherReview'));
