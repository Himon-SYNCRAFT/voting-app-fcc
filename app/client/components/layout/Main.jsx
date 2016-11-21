const React = require('react')
const Link = require('react-router').Link
const browserHistory = require('react-router').browserHistory
const AuthStore = require('../../stores/AuthStore')
const AuthActions = require('../../actions/AuthActions')


class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            auth: AuthStore.get()
        }

        this._onChange = this._onChange.bind(this)
        this._onClickLogOut = this._onClickLogOut.bind(this)
    }

    componentDidMount() {
        AuthStore.addChangeListener(this._onChange)
    }

    componentWillUnmount() {
        AuthStore.removeChangeListener(this._onChange)
    }

    _onChange() {
        this.setState({auth: AuthStore.get()})
    }

    _onClickLogOut(event) {
        event.preventDefault()
        AuthActions.logout()
        browserHistory.push('/')
    }

    render() {
        let userIsLogged = this.state.auth.isLogged
        let rightMenu = []

        if (userIsLogged) {
            rightMenu.push(<li><a href="#" onClick={this._onClickLogOut}>Log out</a></li>)
        } else {
            rightMenu.push(<li><Link to="/auth/login">Log in</Link></li>)
            rightMenu.push(<li><Link to="/auth/register">Register</Link></li>)
        }

        return (
        <div className="container">
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <Link className="navbar-brand" to="/">Home</Link>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav">
                        </ul>
                    <ul className="nav navbar-nav navbar-right">
                        {rightMenu}
                        </ul>
                    </div>
                </div>
            </nav>
            {this.props.children}
        </div>
        )
    }
}

module.exports = Main
