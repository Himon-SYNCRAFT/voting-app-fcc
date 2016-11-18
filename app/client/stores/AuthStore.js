const AppDispatcher = require('../dispatcher/AppDispatcher')
const EventEmitter = require('events').EventEmitter
const AuthConstants = require('../constants/AuthConstants')
const assign = require('object-assign')

let _auth = {
    isLogged: false,
    username: ''
}

const AuthStore = assign({}, EventEmitter.prototype, {
    isLogged: () => {
        return _auth.isLogged
    },

    getUsername: () => {
        return _auth.username
    },

    addChangeListener: function(callback) {
        this.on('change', callback)
    },

    removeChangeListener: function(callback) {
        this.removeListener('change', callback)
    }
})

AppDispatcher.register(action => {
    switch (action.actionType) {
        case AuthConstants.LOGIN_USER:
            _auth.isLogged = action.data.isLogged
            _auth.username = action.data.username
            break

        case AuthConstants.LOGOUT_USER:
            _auth.isLogged = false
            _auth.username = ''
            break

        case AuthConstants.IS_LOGGED_USER:
            _auth.isLogged = action.data.isLogged
            _auth.username = action.data.username
            break
    }

    AuthStore.emit('change')
})

module.exports = AuthStore
