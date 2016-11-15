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
        this.componentDidMount = this.componentDidMount.bind(this)
        this.componentWillUnmount = this.componentWillUnmount.bind(this)
        this.render = this.render.bind(this)
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

        return (<ul id="polls-list">{polls}</ul>)
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
            <li className="polls-list-item"><Link to={to}>{ poll.name }</Link></li>
        )
    }
}

module.exports = PollsList