const AppDispatcher = require('../dispatcher/AppDispatcher')
const EventEmitter = require('events').EventEmitter
const PollsConstants = require('../constants/PollsConstants')
const assign = require('object-assign')

let _polls = []

const PollsStore = assign({}, EventEmitter.prototype, {
    all: () => {
        return _polls
    }



})
