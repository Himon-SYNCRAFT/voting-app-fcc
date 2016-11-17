const React = require('react')
const d3 = require('d3')
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
            }
        }

        this._onChange = this._onChange.bind(this)
    }

    _onChange() {
        this.setState({ poll: PollsStore.one(this.props.params.id) })
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

        for (let key in poll.options) {
            data.push({
                label: key,
                value: poll.options[key]
            })
        }

        return (
            <div>
                <h2>{poll.name}</h2>
                <PieChart data={data} />
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
        let width = this.props.width || 960
        let height = this.props.height || 500
        let radius =  Math.min(width, height) / 2
        let color = d3.scaleOrdinal(d3.schemeCategory20)

        console.log(data);

        let arc = d3.arc()
            .outerRadius(radius - 40)
            .innerRadius(40)

        let labelArc = d3.arc()
            .outerRadius(radius - 10)
            .innerRadius(radius - 10)

        let pie = d3.pie()
            .sort(null)
            .value(d => d.value)

        let svg = d3.select('#d3').append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')

        let g = svg.selectAll('.arc')
            .data(pie(data))
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
