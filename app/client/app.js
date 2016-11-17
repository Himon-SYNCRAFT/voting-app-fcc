const React = require('react')
const ReactDOM = require('react-dom')
const Main = require('./components/layout/Main.jsx')
const PollsList = require('./components/PollsList.jsx')
const Voting = require('./components/Voting.jsx')
const Router = require('react-router').Router
const Route = require('react-router').Route
const IndexRoute = require('react-router').IndexRoute
const browserHistory = require('react-router').browserHistory

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={Main}>
            <IndexRoute component={PollsList}/>
            <Route path="/poll/:id" component={Voting}>
            </Route>
        </Route>
    </Router>
), document.getElementById('app-root'))
