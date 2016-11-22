const AppDispatcher = require('../dispatcher/AppDispatcher')
const EventEmitter = require('events').EventEmitter
const PollsConstants = require('../constants/PollsConstants')
const assign = require('object-assign')

let _polls = []

const PollsStore = assign({}, EventEmitter.prototype, {
    all: () => {
        return _polls
    },

    one: (id) => {
        for(let i in _polls) {
            if (_polls[i]._id === id) {
                return _polls[i]
            }
        }
    },

    addChangeListener: function(callback) {
        this.on('change', callback)
    },

    removeChangeListener: function(callback) {
        this.removeListener('change', callback)
    }
})

AppDispatcher.register((action) => {
    console.log(action.actionType)

    switch (action.actionType) {
        case PollsConstants.GET_ALL_POLLS:
            _polls = action.data
            break;

        case PollsConstants.GET_POLL_BY_USER:
            _polls = action.data
            break;

        case PollsConstants.CREATE_POLL:
            _polls.push(action.data)
            break;

        case PollsConstants.DELETE_POLL:
            let id = action.data._id
            _polls = _polls.filter(poll => poll._id != id)
            break;

        case PollsConstants.UPDATE_POLL:
            for (let i = 0, l = _polls.length; i < l; i++) {
                if (_polls[i]._id === action.id) {
                    _polls[i] = action.data
                }
            }
            break;
    }

    PollsStore.emit('change')
})

module.exports = PollsStore
