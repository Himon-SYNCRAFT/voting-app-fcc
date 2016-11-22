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

    create: () => {},
    update: () => {},
    vote: () => {},
}

module.exports = PollsActions
