const React = require('react')
const Link = require('react-router').Link
const browserHistory = require('react-router').browserHistory
const AuthStore = require('../../stores/AuthStore')
const AuthActions = require('../../actions/AuthActions')
const LoginModal = require('../LoginModal.jsx')


class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            auth: AuthStore.get(),
            isLoginModalOpen: false
        }

        this._closeModal = this._closeModal.bind(this)
        this._openModal = this._openModal.bind(this)
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

	_closeModal() {
        this.setState({isLoginModalOpen: false})
    }

    _openModal() {
        this.setState({isLoginModalOpen: true})
    }

    render() {
        let userIsLogged = AuthStore.isLogged()
        let rightMenu = []

        if (userIsLogged) {
            rightMenu.push(<li key="logout"><a href="#" onClick={this._onClickLogOut}>Log out</a></li>)
            rightMenu.push(<li key="my-polls"><Link to="/user/polls">My polls</Link></li>)
            rightMenu.push(<li key="new-poll"><Link to="/user/poll/add">New poll</Link></li>)
        } else {
            rightMenu.push(<li key="login"><a href="#" onClick={this._openModal}>Log in</a></li>)
            rightMenu.push(<li key="register"><Link to="/auth/register">Register</Link></li>)
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
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav">
                            <li><Link to="/">Home</Link></li>
                        </ul>
                    <ul className="nav navbar-nav navbar-right">
                        {rightMenu}
                        </ul>
                    </div>
                </div>
            </nav>
                {this.props.children}
                <LoginModal closeModal={this._closeModal} openModal={this._openModal} isLoginModalOpen={this.state.isLoginModalOpen} />
        </div>
        )
    }
}

module.exports = Main
