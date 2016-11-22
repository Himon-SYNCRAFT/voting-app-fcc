const React = require('react')
const ReactDOM = require('react-dom')
const Main = require('./components/layout/Main.jsx')
const PollsList = require('./components/PollsList.jsx')
const UserPollsList = require('./components/UserPollsList.jsx')
const VotingPanel = require('./components/VotingPanel.jsx')
const LoginPanel = require('./components/LoginPanel.jsx')
const RegistrationPanel = require('./components/RegistrationPanel.jsx')
const PollForm = require('./components/PollForm.jsx')
const Router = require('react-router').Router
const Route = require('react-router').Route
const IndexRoute = require('react-router').IndexRoute
const browserHistory = require('react-router').browserHistory

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={Main}>
            <IndexRoute component={PollsList}/>
            <Route path="/user/polls" component={UserPollsList}/>
            <Route path="/user/poll/add" component={PollForm}/>
            <Route path="/poll/:id" component={VotingPanel}/>
            <Route path="/auth/login" component={LoginPanel}/>
            <Route path="/auth/register" component={RegistrationPanel}/>
        </Route>
    </Router>
), document.getElementById('app-root'))
