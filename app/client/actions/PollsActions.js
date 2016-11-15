const AppDispatcher = require('../dispatcher/AppDispatcher')
const PollsConstants = require('../constants/PollsConstants')
const Api = require('../Api')

const PollsActions = {
    all: () => {
        Api.polls.all()
            .then((response) => {
                AppDispatcher.dispatch({
                    actionType: PollsConstants.GET_ALL,
                    data: response.data
                })
            })
    },

    one: () => {
        Api.polls.one(id)
            .then((response) => {
                AppDispatcher.dispatch({
                    actionType: PollsConstants.GET,
                    data: response.data
                })
            })
    },

    create: () => {},
    update: () => {},
    vote: () => {},
}
