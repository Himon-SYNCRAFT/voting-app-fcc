const React = require('react')
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
        return (<h1>Daniel</h1>)
    }
}

module.exports = PollsList
