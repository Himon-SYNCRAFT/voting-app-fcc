const React = require('react')
const Link = require('react-router').Link
const PollsStore = require('../stores/PollsStore')
const PollsActions = require('../actions/PollsActions')


class PollsList extends React.Component {
    constructor() {
        super()
        this.state = {
            polls: []
        }

        PollsActions.all()

        this._onChange = this._onChange.bind(this)
    }

    _onChange() {
        this.setState({polls: PollsStore.all()})
    }

    componentDidMount() {
        PollsStore.addChangeListener(this._onChange)
    }

    componentWillUnmount() {
        PollsStore.removeChangeListener(this._onChange)
    }

    render() {
        let polls = this.state.polls.map(poll => {
            return <PollsListItem key={poll._id} poll={poll} />
        })

        return (
            <div>
                <h2>Polls List</h2>
                <ul className="list-unstyled" id="polls-list">{polls}</ul>
            </div>
        )
    }
}

class PollsListItem extends React.Component {
    constructor(props) {
        super(props)

        this.render = this.render.bind(this)
    }

    render() {
        let poll = this.props.poll
        let to = '/poll/' + this.props.poll._id

        return (
            <li className="polls-list-item"><Link className="btn btn-default btn-lg" to={to}>{ poll.name }</Link></li>
        )
    }
}

module.exports = PollsList
