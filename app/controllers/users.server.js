'use strict'

const bcrypt = require('bcrypt')
const saltRounds = 10

function usersHandler (db) {
    let usersCollection = db.collection('users')

    this.createUser = (req, res) => {
        bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
            if (err) {
                throw err
            }

            let user = {
                name: req.body.username,
                password: hash
            }

            usersCollection.insertOne(user, (err, result) => {
                if (err) {
                    throw err
                }

                res.json({_id: user._id, name: user.name})
            })
        })
    }

    this.login = (req, res) => {
        usersCollection.findOne({ name: req.body.username }, (err, doc) => {
            if (err) {
                throw err
            } else if (!doc) {
                res.json({ status: 'failed' })
            } else {
                let hash = doc.password
                bcrypt.compare(req.body.password, hash, (err, r)  => {
                    if (res) {
                        req.session.isLogged = true
                        req.session.userId = doc._id
                        res.json({ status: 'success' })
                    } else {
                        res.json({ status: 'failed' })
                    }
                })
            }

        })
    }

    this.logout = (req, res) => {
        req.session.destroy(err => {
            if (err) {
                throw err
            } else {
                res.json({ status: 'success' })
            }
        })
    }

    this.isLogged = (req, res) => {
        res.json({ isLogged: req.session.isLogged })
    }
}

module.exports = usersHandler
