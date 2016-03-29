/**
 * Top Level App, Routing is handled from here. Routes manage full page components.
 */

var React          = require('react');
var ReactDOM       = require('react-dom');
var ReactRouter    = require('react-router');
var auth           = require('./auth');

var Signup         = require('./components/Signup/Signup.jsx');
var Login          = require('./components/Login/Login.jsx');
var Dashboard      = require('./components/Dashboard/Dashboard.jsx');
var SearchResults  = require('./components/SearchResults/SearchResults.jsx');
var TeacherPage    = require('./components/TeacherPage/TeacherPage.jsx');
var CoursePage     = require('./components/CoursePage/CoursePage.jsx');

var browserHistory = ReactRouter.browserHistory;
var Router         = ReactRouter.Router;
var Route          = ReactRouter.Route;

function pretendRequest(email, pass, cb) {
  setTimeout(function() {
    if (email === 'joe@example.com' && pass === 'password1') {
      cb({
        authenticated: true,
        token: Math.random().toString(36).substring(7)
      })
    } else {
      cb({ authenticated: false })
    }
  }, 0);
}

var auth = {
  login: function(email, pass, cb) {
    cb = arguments[arguments.length - 1];

    if (localStorage.token) {
      if (cb) cb(true)
      this.onChange(true)
      return
    }

    pretendRequest(email, pass, function(res) {
      if (res.authenticated) {
        localStorage.token = res.token
        if (cb) cb(true)
        this.onChange(true)
      } else {
        if (cb) cb(false)
        this.onChange(false)
      }
    })
  },

  getToken: function() {
    return localStorage.token
  },

  logout: function(cb) {
    delete localStorage.token
    if (cb) cb()
    this.onChange(false)
  },

  loggedIn: function() {
    return !!localStorage.token
  },

  onChange: function() {}
}

//Run Router

function requireAuth(nextState, replace) {
  if (!auth.loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path='/login' component={Login} />
    <Route path="/register" component={Signup} />
    <Route path="/course/*" component={CoursePage} />
    <Route path="/instructor/*" component={TeacherPage} />
    <Route path="/" component={Dashboard} onEnter={requireAuth} />
    <Route path="/results/:type/:query" component={SearchResults} />
    {/* <Route path="about" component={About} /> */}
  </Router>
), document.getElementById('TeacherReview'));