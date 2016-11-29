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
            .catch(error => {

                if (error.response) {
                    AppDispatcher.dispatch({
                        actionType: PollsConstants.POLLS_NOT_FOUND,
                        data: error.response,
                        message: 'We were unable to get the data you are looking for. Please try again later.'
                    })
                } else {
                    console.log(error.message);
                }
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
            .catch(error => {

                if (error.response) {
                    AppDispatcher.dispatch({
                        actionType: PollsConstants.POLL_NOT_FOUND,
                        data: error.response,
                        message: 'We were unable to obtain the poll data. The poll has been removed or has never existed.'
                    })
                } else {
                    console.log(error.message);
                }
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
            .catch(error => {

                if (error.response) {
                    AppDispatcher.dispatch({
                        actionType: PollsConstants.POLLS_NOT_FOUND,
                        data: error.response,
                        message: 'We were unable to get the data you are looking for. Please try again later.'
                    })
                } else {
                    console.log(error.message);
                }
            })
    },

    delete: (id) => {
        Api.polls.delete(id)
            .then(response => {
                AppDispatcher.dispatch({
                    actionType: PollsConstants.DELETE_POLL,
                    data: id
                })
            })
            .catch(error => {

                if (error.response) {
                    let message = ''
                    let actionType

                    switch (error.response.status) {
                        case 404:
                            actionType = PollsConstants.POLL_NOT_FOUND
                            message = 'We were unable to obtain the poll data. The poll has been already removed or has never existed.'
                            AppDispatcher.dispatch({
                                actionType: PollsConstants.DELETE_POLL,
                                data: id
                            })
                            break

                        case 403:
                            actionType = PollsConstants.POLL_FORBIDDEN_ACTION
                            message = 'You can modify only your polls and only as an authorized user'
                            break

                        default:
                            actionType = PollsConstants.POLL_ERROR
                            message = 'We were unable to perform the requested action. Please try again later.'
                    }

                    AppDispatcher.dispatch({
                        actionType,
                        data: error.response,
                        message
                    })
                } else {
                    console.log(error.message);
                    console.log(error);
                }
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
            .catch(error => {

                if (error.response) {
                    let message = ''
                    let actionType

                    switch (error.response.status) {
                        case 403:
                            actionType = PollsConstants.POLL_FORBIDDEN_ACTION
                            message = 'You can create polls only as an authorized user'
                            break

                        default:
                            actionType = PollsConstants.POLL_ERROR
                            message = 'We were unable to perform the requested action. Please try again later.'
                    }

                    AppDispatcher.dispatch({
                        actionType,
                        data: error.response,
                        message
                    })
                } else {
                    console.log(error.message);
                }
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
            .catch(error => {

                if (error.response) {
                    let message = ''
                    let actionType

                    switch (error.response.status) {
                        case 404:
                            actionType = PollsConstants.POLL_NOT_FOUND
                            message = 'We were unable to obtain the poll data. The poll has been removed or has never existed.'
                            break

                        default:
                            actionType = PollsConstants.POLL_ERROR
                            message = 'We were unable to perform the requested action. Please try again later.'
                    }

                    AppDispatcher.dispatch({
                        actionType,
                        data: error.response,
                        message
                    })
                } else {
                    console.log(error.message);
                }
            })
    },

    addOption: (id, data) => {
        Api.polls.addOption(id, data)
            .then(response => {
                AppDispatcher.dispatch({
                    actionType: PollsConstants.ADD_POLL_OPTION,
                    data: response.data
                })
            })
            .catch(error => {

                if (error.response) {
                    let message = ''
                    let actionType

                    switch (error.response.status) {
                        case 403:
                            actionType = PollsConstants.POLL_FORBIDDEN_ACTION
                            message = 'You can add options only as an authorized user'
                            break

                        default:
                            actionType = PollsConstants.POLL_ERROR
                            message = 'We were unable to perform the requested action. Please try again later.'
                    }

                    AppDispatcher.dispatch({
                        actionType,
                        data: error.response,
                        message
                    })
                } else {
                    console.log(error.message);
                }
            })
    }
}

module.exports = PollsActions
