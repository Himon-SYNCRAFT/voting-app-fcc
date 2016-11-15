const React = require('react')
const PollsStore = require('../stores/PollsStore')
const PollsActions = require('../actions/PollsActions')

class VotingPanel extends React.Component {
    constructor(props) {
        super(props)
        PollsActions.all()

        this.state = { poll: null }
    }

    componentDidMount() {
        this.setState({ poll: PollsStore.one(this.props.params.id) })
    }

    render() {
        let poll = this.state.poll

        if (poll) {
            return <h1>{this.state.poll.name}</h1>
        }

        return null
    }
}

module.exports = VotingPanel
