const React = require('react')
const ReactDOM = require('react-dom')
const PollsList = require('./components/PollsList.jsx')
const Voting = require('./components/Voting.jsx')
const Router = require('react-router').Router
const Route = require('react-router').Route
const browserHistory = require('react-router').browserHistory

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={PollsList}>
        </Route>
        <Route path="/poll/:id" component={Voting}>
        </Route>
    </Router>
), document.getElementById('app-root'))
