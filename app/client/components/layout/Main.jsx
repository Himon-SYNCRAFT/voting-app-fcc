const React = require('react')
const Link = require('react-router').Link
const browserHistory = require('react-router').browserHistory
const AuthStore = require('../../stores/AuthStore')
const ErrorsStore = require('../../stores/ErrorsStore')
const AuthActions = require('../../actions/AuthActions')
const LoginModal = require('../LoginModal.jsx')


class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            auth: AuthStore.get(),
            isLoginModalOpen: false,
            errors: ErrorsStore.all()
        }

        this._closeModal = this._closeModal.bind(this)
        this._openModal = this._openModal.bind(this)
        this._onChange = this._onChange.bind(this)
        this._onClickLogOut = this._onClickLogOut.bind(this)
    }

    componentDidMount() {
        AuthStore.addChangeListener(this._onChange)
        ErrorsStore.addChangeListener(this._onChange)
    }

    componentWillReceiveProps() {
        AuthActions.isLogged()
        this.setState({
            errors: ErrorsStore.all()
        })
    }

    componentWillUnmount() {
        AuthStore.removeChangeListener(this._onChange)
        ErrorsStore.removeChangeListener(this._onChange)
    }

    _onChange() {
        this.setState({
            auth: AuthStore.get(),
            errors: ErrorsStore.all()
        })
    }

    _onClickLogOut(event) {
        event.preventDefault()
        AuthActions.logout()
        browserHistory.push('/')
    }

	_closeModal(event) {
        event.preventDefault()
        this.setState({isLoginModalOpen: false})
    }

    _openModal(event) {
        event.preventDefault()
        this.setState({isLoginModalOpen: true})
    }

    render() {
        let userIsLogged = AuthStore.isLogged()
        let errors = this.state.errors.map((error, i) => {
            return (<div key={i} className="alert alert-danger" role="alert">{error}</div>)
        })
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
                {errors}
                {this.props.children}
                <LoginModal closeModal={this._closeModal} openModal={this._openModal} isLoginModalOpen={!userIsLogged && this.state.isLoginModalOpen} />
        </div>
        )
    }
}

module.exports = Main
