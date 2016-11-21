'use strict'

let PollsHandler = require(process.cwd() + '/app/controllers/polls.server.js')
let UsersHandler = require(process.cwd() + '/app/controllers/users.server.js')

module.exports = (app, db) => {
    let pollsHandler = new PollsHandler(db)
    let usersHandler = new UsersHandler(db)

    app.route('/api/polls')
        .get(pollsHandler.getAll)
        .post(isLogged, pollsHandler.addPoll)

    app.route('/api/poll/:id')
        .get(pollsHandler.getOne)
        .post(isLogged, pollsHandler.addOption)
        .delete(isLogged, pollsHandler.deletePoll)

    app.route('/api/poll/:id/vote/:option')
        .get(pollsHandler.vote)

    app.route('/api/users')
        .post(usersHandler.createUser)

    app.route('/api/auth/login')
        .post(usersHandler.login)

    app.route('/api/auth/logout')
        .get(usersHandler.logout)

    app.route('/api/polls/user/:userId')
        .get(pollsHandler.getUserPolls)

    app.route('/api/auth/islogged')
        .get(usersHandler.isLogged)

    app.route('*')
        .get((req, res) => {
            res.sendFile(process.cwd() + '/public/index.html')
        })
}

function isLogged(req, res, next) {
    if (req.session.isLogged) {
        return next()
    }

    res.status(403)
    res.end()
}
