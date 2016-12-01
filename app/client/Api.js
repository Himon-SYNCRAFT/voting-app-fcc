const axios = require('axios')
const instance = axios.create({
    baseURL: 'https://polls-app-fcc.herokuapp.com/api/',
    timeout: 10000
})


const Api = {
    polls: {
        all: () => {
            return instance.get('/polls')
        },

        one: (id) => {
            return instance.get('/poll/' + id)
        },

        delete: (id) => {
            return instance.delete('/poll/' + id)
        },

        getByUser: (userId) => {
            return instance.get('/polls/user/' + userId)
        },

        create: (data) => {
            return instance.post('/polls', data)
        },

        addOption: (id, data) => {
            return instance.patch('/poll/' + id, data)
        },

        vote: (id, option) => {
            return instance.get('/poll/' + id + '/vote/' + option)
        }
    },

    users: {
        create: (data) => {
            return instance.post('/users', data)
        }
    },

    auth: {
        login: (data) => {
            return instance.post('/auth/login', data)
        },

        logout: () => {
            return instance.get('/auth/logout')
        },

        isLogged: () => {
            return instance.get('/auth/islogged')
        }
    }
}

module.exports = Api
