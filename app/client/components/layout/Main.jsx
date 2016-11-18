const React = require('react')
const Link = require('react-router').Link


class Main extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
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
                            <li><Link to="/auth/login">Log in</Link></li>
                            <li><Link to="/auth/register">Register</Link></li>
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
