const AppDispatcher = require('../dispatcher/AppDispatcher')
const UsersConstants = require('../constants/UsersConstants')
const Api = require('../Api')

const UsersActions = {
    all: () => {
        Api.users.all()
            .then((response) => {
                AppDispatcher.dispatch({
                    actionType: UsersConstants.GET_ALL_USERS,
                    data: response.data
                })
            })
    },

    one: () => {
        Api.users.one(id)
            .then((response) => {
                AppDispatcher.dispatch({
                    actionType: UsersConstants.GET_USER,
                    data: response.data
                })
            })
    },

    create: (data) => {
        Api.users.create(data)
            .then(response => {
                AppDispatcher.dispatch({
                    actionType: UsersConstants.CREATE_USER,
                    data: response.data
                })
            })
    },

    update: () => {},
    vote: () => {},
}

module.exports = UsersActions
