const React = require('react')
const d3 = require('d3')
const Modal = require('react-modal')
const PollsStore = require('../stores/PollsStore')
const PollsActions = require('../actions/PollsActions')

class VotingPanel extends React.Component {
    constructor(props) {
        super(props)
        PollsActions.all()

        this.state = {
            poll: {
                name: '',
                options: {}
            },

            vote: '',

            modalIsOpen: false
        }

        this._onChange = this._onChange.bind(this)
        this._handleOption = this._handleOption.bind(this)
        this._onSubmit = this._onSubmit.bind(this)
        this._closeModal = this._closeModal.bind(this)
        this._openModal = this._openModal.bind(this)
    }

    _onChange() {
        this.setState({ poll: PollsStore.one(this.props.params.id) })
    }

    _handleOption(event) {
        this.setState({ vote: event.target.value })
    }

    _closeModal() {
        this.setState({modalIsOpen: false})
    }

    _openModal() {
        this.setState({modalIsOpen: true})
    }

    _onSubmit(event) {
        event.preventDefault()
        PollsActions.vote(this.props.params.id, this.state.vote)
    }

    componentDidMount() {
        PollsStore.addChangeListener(this._onChange)
    }

    componentWillUnmount() {
        PollsStore.removeChangeListener(this._onChange)
    }

    render() {
        let poll = this.state.poll
        let data = []
        let options = [(<option key={""} value=''>-- Choose --</option>)]
        let isButtonDisabled = this.state.vote == ''

        for (let key in poll.options) {
            data.push({
                label: key,
                value: poll.options[key]
            })

            options.push(<option key={key} value={key}>{key}</option>)
        }

        return (
            <div>
                <h2>{poll.name}</h2>
                <div className="col-sm-3">
                    <form onSubmit={this._onSubmit}>
                        <div className="form-group">
                            <select value={this.state.vote} onChange={this._handleOption} className="form-control">
                                {options}
                            </select>
                        </div>
                         <div className="form-group">
                           <button className="btn btn-success" disabled={isButtonDisabled ? 'disabled' : ''}>Vote</button>
                        </div>
                    </form>
                    <button className="btn btn-success" onClick={this._openModal}>Add option</button>
                </div>
                <div className="col-sm-9" style={{textAlign: 'center'}}>
                    <PieChart data={data} />
                </div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this._closeModal}
                    contentLabel="Add new option"
                    style={{
                        content: {
                            border: 'none',
                            background: 'none'
                        }
                    }}
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" onClick={this._closeModal}><span aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title">Modal title</h4>
                            </div>
                            <div className="modal-body">
                                <p>One fine body&hellip;</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" onClick={this._closeModal}>Close</button>
                                <button type="button" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}

class PieChart extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let data = this.props.data
        let noEmptyData = data.filter(item => item.value != 0)
        let width = this.props.width || 500
        let height = this.props.height || 500
        let radius =  Math.min(width, height) / 2
        let color = d3.scaleOrdinal(d3.schemeCategory20)

        let arc = d3.arc()
            .outerRadius(radius - 40)
            .innerRadius(40)

        let labelArc = d3.arc()
            .outerRadius(radius - 10)
            .innerRadius(radius - 10)

        let pie = d3.pie()
            .sort(null)
            .value(d => d.value)

        let root = d3.select('#d3')

        root.select('svg').remove()

        let svg = root.append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')

        let g = svg.selectAll('.arc')
            .data(pie(noEmptyData))
            .enter().append('g')
            .attr('class', 'arc')

        g.append('path')
            .attr('d', arc)
            .style('fill', d => color(d.data.label))

        g.append('text')
            .attr('transform', d => 'translate(' + labelArc.centroid(d) + ')')
            .attr('dy', '.35em')
            .text(d => d.data.label)
            .style('text-anchor', 'middle')

        return <div id="d3"></div>
    }
}

module.exports = VotingPanel
