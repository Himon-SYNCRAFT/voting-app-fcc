const React = require('react')
const AuthStore = require('../stores/AuthStore')
const AuthActions = require('../actions/AuthActions')
const browserHistory = require('react-router').browserHistory
const Modal = require('react-modal')

class LoginModal extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            user: {
                username: '',
                password: ''
            }
        }

        this._onSubmit = this._onSubmit.bind(this)
        this._handleUsernameChange = this._handleUsernameChange.bind(this)
        this._handlePasswordChange = this._handlePasswordChange.bind(this)
    }

    _handleUsernameChange(event) {
        let user = this.state.user
        user.username = event.target.value
        this.setState({ user })
    }

    _handlePasswordChange(event) {
        let user = this.state.user
        user.password = event.target.value
        this.setState({ user })
    }

    _onSubmit(event) {
        event.preventDefault()
        let user = this.state.user
        AuthActions.login(user)
        browserHistory.push('/')
    }

    render() {
        return (
			<Modal
				isOpen={this.props.isLoginModalOpen}
                onRequestClose={this.props.closeModal}
                contentLabel="Add new option"
                style={{
                    content: {
                        border: 'none',
                        background: 'none'
                    }
                }}
            >
                <form method="post" className="form-horizontal" onSubmit={this._onSubmit}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" onClick={this.props.closeModal}><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title">Login Panel</h4>
                        </div>
						<div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="username" className="col-sm-2 control-label" >Username</label>
                                    <div className="col-sm-10">
                                        <input id="username" name="username" placeholder="username" className="form-control" type="text" value={this.state.user.username} onChange={this._handleUsernameChange} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password" className="col-sm-2 control-label">Password</label>
                                    <div className="col-sm-10">
                                        <input id="password" name="password" placeholder="password" className="form-control" type="password" value={this.state.user.password} onChange={this._handlePasswordChange} />
                                    </div>
                                </div>
                        </div>
						<div className="modal-footer">
							<button className="btn btn-success">Submit</button>
							<button className="btn btn-danger" onClick={this.props.closeModal}>Cancel</button>
                        </div>
                    </div>
                </div>
                </form>
            </Modal>
        )
    }
}

module.exports = LoginModal
