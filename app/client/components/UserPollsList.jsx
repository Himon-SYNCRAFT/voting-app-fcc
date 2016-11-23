const React = require('react')
const Link = require('react-router').Link
const PollsStore = require('../stores/PollsStore')
const AuthStore = require('../stores/AuthStore')
const PollsActions = require('../actions/PollsActions')
const AuthActions = require('../actions/AuthActions')


class UserPollsList extends React.Component {
    constructor() {
        super()
        this.state = {
            polls: [],
            auth: AuthStore.get()
        }

        let userId = this.state.auth.userId

        PollsActions.getByUser(userId)

        this._onChange = this._onChange.bind(this)
        this._onChangeAuth = this._onChangeAuth.bind(this)
    }

    _onChange() {
        this.setState({
            polls: PollsStore.all(),
        })
    }

    _onChangeAuth() {
        let userId = this.state.auth.userId
        PollsActions.getByUser(userId)
    }

    componentDidMount() {
        PollsStore.addChangeListener(this._onChange)
        AuthStore.addChangeListener(this._onChangeAuth)
    }

    componentWillUnmount() {
        PollsStore.removeChangeListener(this._onChange)
        AuthStore.removeChangeListener(this._onChangeAuth)
    }

    _onClickDelete(id) {
        PollsActions.delete(id)
    }

    render() {
        let polls = this.state.polls.map((poll, i) => {
            return <PollsListItem key={poll._id} index={i} poll={poll} onClickDelete={this._onClickDelete.bind(this, poll._id)} />
        })

        return (
            <div>
                <h2>Polls List</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Show</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {polls}
                    </tbody>
                </table>
            </div>
        )
    }
}

class PollsListItem extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let poll = this.props.poll
        let to = '/poll/' + this.props.poll._id

        return (
            <tr>
                <td>{ this.props.index + 1 }</td>
                <td>{ poll.name }</td>
                <td>
                    <Link to={to} className="btn btn-info">Show</Link>
                </td>
                <td>
                    <button className="btn btn-danger" onClick={this.props.onClickDelete}>Delete</button>
                </td>
            </tr>
        )
    }
}

module.exports = UserPollsList

