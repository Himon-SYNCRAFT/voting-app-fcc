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
    switch (action.actionType) {
        case PollsConstants.GET_ALL:
            _polls = action.data
            break;

        case PollsConstants.GET_BY_USER:
            _polls = action.data
            break;

        case PollsConstants.CREATE:
            _polls.push(action.data)
            break;

        case PollsConstants.UPDATE:
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
