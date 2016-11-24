const AppDispatcher = require('../dispatcher/AppDispatcher')
const EventEmitter = require('events').EventEmitter
const PollsConstants = require('../constants/PollsConstants')
const assign = require('object-assign')

const CHANGE = 'CHANGE POLLS'

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
        this.on(CHANGE, callback)
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE, callback)
    }
})

AppDispatcher.register((action) => {
    console.log(action.actionType)

    switch (action.actionType) {
        case PollsConstants.GET_ALL_POLLS:
            _polls = action.data
            PollsStore.emit(CHANGE)
            break;

        case PollsConstants.VOTE:
            for (let i = 0, len = _polls.length; i < len; i++) {
                if (_polls[i]._id == action.data._id) {
                    _polls[i] = action.data
                }
            }
            PollsStore.emit(CHANGE)
            break;

        case PollsConstants.GET_POLLS_BY_USER:
            _polls = action.data
            PollsStore.emit(CHANGE)
            break;

        case PollsConstants.CREATE_POLL:
            _polls.push(action.data)
            PollsStore.emit(CHANGE)
            break;

        case PollsConstants.DELETE_POLL:
            let id = action.data._id
            _polls = _polls.filter(poll => poll._id != id)
            PollsStore.emit(CHANGE)
            break;

        case PollsConstants.ADD_POLL_OPTION:
            for (let i = 0, l = _polls.length; i < l; i++) {
                if (_polls[i]._id == action.data._id) {
                    _polls[i] = action.data
                }
            }
            PollsStore.emit(CHANGE)
            break;
    }

})

module.exports = PollsStore
