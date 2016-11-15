'use strict'

let PollsHandler = require(process.cwd() + '/app/controllers/polls.server.js')

module.exports = (app, db) => {
    let pollsHandler = new PollsHandler(db)

    app.route('/')
        .get((req, res) => {
            res.render('index')
        })

    app.route('/api/polls')
        .get(pollsHandler.getAll)
        .post(pollsHandler.addPoll)

    app.route('/api/poll/:id')
        .get(pollsHandler.getOne)
        .post(pollsHandler.addOption)

    app.route('/api/poll/:id/vote/:option')
        .get(pollsHandler.vote)
}
