const AppDispatcher = require('../dispatcher/AppDispatcher')
const PollsConstants = require('../constants/PollsConstants')
const Api = require('../Api')

const PollsActions = {
    all: () => {
        Api.polls.all()
            .then((response) => {
                AppDispatcher.dispatch({
                    actionType: PollsConstants.GET_ALL_POLLS,
                    data: response.data
                })
            })
    },

    one: () => {
        Api.polls.one(id)
            .then((response) => {
                AppDispatcher.dispatch({
                    actionType: PollsConstants.GET_POLL,
                    data: response.data
                })
            })
    },

    getByUser: (userId) => {
        Api.polls.getByUser(userId)
            .then(response => {
                AppDispatcher.dispatch({
                    actionType: PollsConstants.GET_POLLS_BY_USER,
                    data: response.data
                })
            })
    },

    delete: (id) => {
        Api.polls.delete(id)
            .then(response => {
                AppDispatcher.dispatch({
                    actionType: PollsConstants.DELETE_POLL,
                    data: response.data.value
                })
            })
    },

    create: (data) => {
        Api.polls.create(data)
            .then(response => {
                AppDispatcher.dispatch({
                    actionType: PollsConstants.CREATE_POLL,
                    data: response.data
                })
            })
    },

    vote: (id, data) => {
        Api.polls.vote(id, data)
            .then(response => {
                AppDispatcher.dispatch({
                    actionType: PollsConstants.VOTE,
                    data: response.data
                })
            })
    },
}

module.exports = PollsActions
