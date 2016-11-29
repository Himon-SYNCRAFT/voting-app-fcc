const AppDispatcher = require('../dispatcher/AppDispatcher')
const EventEmitter = require('events').EventEmitter
const ErrorsConstants = require('../constants/ErrorsConstants')
const PollsConstants = require('../constants/PollsConstants')
const assign = require('object-assign')

const CHANGE = 'CHANGE ERRORS'

let _errors = []

const ErrorsStore = assign({}, EventEmitter.prototype, {
    all: () => {
        let errors = _errors.slice()
        _errors = []
        return errors
    },

    get: () => {
        return _errors.pop()
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
        case PollsConstants.POLL_FORBIDDEN_ACTION:
            _errors.push(action.message)
            ErrorsStore.emit(CHANGE)
            break

        case PollsConstants.POLL_ERROR:
            _errors.push(action.message)
            ErrorsStore.emit(CHANGE)
            break

        case PollsConstants.POLL_NOT_FOUND:
            _errors.push(action.message)
            ErrorsStore.emit(CHANGE)
            break

        case PollsConstants.POLLS_NOT_FOUND:
            _errors.push(action.message)
            ErrorsStore.emit(CHANGE)
            break
    }

})

module.exports = ErrorsStore

