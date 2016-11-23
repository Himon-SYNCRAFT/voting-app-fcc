const AppDispatcher = require('../dispatcher/AppDispatcher')
const EventEmitter = require('events').EventEmitter
const UsersConstants = require('../constants/UsersConstants')
const assign = require('object-assign')

const CHANGE = 'CHANGE USERS'

let _users = []

const UsersStore = assign({}, EventEmitter.prototype, {
    all: () => {
        return _users
    },

    one: (id) => {
        for(let i in _users) {
            if (_users[i]._id === id) {
                return _users[i]
            }
        }
    },

    addChangeListener: function(callback) {
        this.on(CHANGE, callback)
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE, callback)
    }
})

AppDispatcher.register((action) => {
    switch (action.actionType) {
        case UsersConstants.GET_ALL:
            _users = action.data
            UsersStore.emit(CHANGE)
            break;

        case UsersConstants.CREATE:
            _users.push(action.data)
            UsersStore.emit(CHANGE)
            break;

        case UsersConstants.UPDATE:
            for (let i = 0, l = _users.length; i < l; i++) {
                if (_users[i]._id === action.id) {
                    _users[i] = action.data
                }
            }
            UsersStore.emit(CHANGE)
            break;
    }

})

module.exports = UsersStore
