const AppDispatcher = require('../dispatcher/AppDispatcher')
const EventEmitter = require('events').EventEmitter
const AuthConstants = require('../constants/AuthConstants')
const assign = require('object-assign')

const CHANGE = 'CHANGE AUTH'

function setUser(user, id) {
    localStorage.setItem('username', user)
    localStorage.setItem('userId', id)
}

function removeUser() {
    localStorage.removeItem('username')
    localStorage.removeItem('userId')
}

const AuthStore = assign({}, EventEmitter.prototype, {
    get: () => {
        let username = localStorage.getItem('username')
        let userId = localStorage.getItem('userId')
        return { username, userId }
    },

    isLogged: () => {
        let username = localStorage.getItem('username')
        let userId = localStorage.getItem('userId')
        return username && userId
    },

    addChangeListener: function(callback) {
        this.on(CHANGE, callback)
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE, callback)
    }
})

AppDispatcher.register(action => {

    switch (action.actionType) {
        case AuthConstants.LOGIN_USER:
            setUser(action.data.username, action.data.id)
            AuthStore.emit(CHANGE)
            break

        case AuthConstants.LOGOUT_USER:
            removeUser()
            AuthStore.emit(CHANGE)
            break
    }
})

module.exports = AuthStore
