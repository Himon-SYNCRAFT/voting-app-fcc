'use strict'

let PollsHandler = require(process.cwd() + '/app/controllers/polls.server.js')

module.exports = (app) => {
    app.route('/')
        .get((req, res) => {
            res.send('Hello')
        })

    app.route('/api/polls')
        .get(pollsHandler.getAll)
}
