const React = require('react')
const PollsStore = require('../stores/PollsStore')
const PollsActions = require('../actions/PollsActions')


class PollForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            options: ''
        }

        this._onSubmit = this._onSubmit.bind(this)
        this._handleNameChange = this._handleNameChange.bind(this)
        this._handleOptionsChange = this._handleOptionsChange.bind(this)
    }

    _onSubmit(event) {
        event.preventDefault()
        let poll = {
            name: this.state.name,
            options: this.state.options.split('\n')
        }
        PollsActions.create(poll)
        this.setState(
            this.state = {
                name: '',
                options: ''
        })
    }

    _handleNameChange(event) {
        this.setState({name: event.target.value})
    }

    _handleOptionsChange(event) {
        this.setState({options: event.target.value})
    }

    render() {
        return (
            <form onSubmit={this._onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input className="form-control" name="name" id="name" placeholder="name" onChange={this._handleNameChange} value={this.state.name} />
                </div>
                <div className="form-group">
                    <label htmlFor="options">Options</label>
                    <textarea className="form-control" name="options" id="options" placeholder="options separated by new line" onChange={this._handleOptionsChange} value={this.state.options}></textarea>
                </div>
                <div className="form-group">
                    <button className="btn btn-success">Save</button>
                </div>
            </form>
        )
    }
}

module.exports = PollForm
