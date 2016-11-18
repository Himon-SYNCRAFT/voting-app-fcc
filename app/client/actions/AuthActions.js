const AppDispatcher = require('../dispatcher/AppDispatcher')
const AuthConstants = require('../constants/AuthConstants')
const Api = require('../Api')

const AuthActions = {
    login: (data) => {
        Api.auth.login(data)
            .then(response => {
                AppDispatcher.dispatch({
                    actionType: AuthConstants.LOGIN_USER,
                    data: response.data
                })
            })
    },

    logout: () => {
        Api.auth.logout()
            .then(response => {
                AppDispatcher.dispatch({
                    actionType: AuthConstants.LOGOUT_USER
                })
            })
    },

    isLogged: () => {
        Api.auth.isLogged()
            .then(response => {
                AppDispatcher.dispatch({
                    actionType: AuthConstants.IS_LOGGED_USER,
                    data: response.data
                })
            })
    }
}

module.exports = AuthActions
