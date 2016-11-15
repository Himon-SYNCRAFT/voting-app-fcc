const axios = require('axios')
const instance = axios.create({
    baseURL: 'http://localhost:3000/api/',
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

        create: (data) => {
            return instance.post('/polls', data)
        },

        update: (id, data) => {
            return instance.patch('/poll/' + id, data)
        },

        vote: (id, option) => {
            return instance.get('/poll/' + id + '/vote/' + option)
        }
    }
}

module.exports = Api
