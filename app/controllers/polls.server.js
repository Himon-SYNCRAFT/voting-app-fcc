'use strict'

let ObjectID = require('mongodb').ObjectID

function pollsHandler(db) {
    let pollsCollection = db.collection('polls')

    this.getAll = (req, res) => {
        pollsCollection.find().toArray((err, docs) => {
            if (err) {
                throw err
            } else {
                res.json(docs)
            }
        })
    }

    this.getOne = (req, res) => {
        let id
        try {
            id = ObjectID(req.params.id)
        } catch(err) {
            res.status(400)
                .json({ error: err })
            return
        }

        pollsCollection.findOne({ _id: id }, (err, doc) => {
            if (err) {
                throw err
            } else if (!doc) {
                res.status(404)
                    .send('Not Found')
            } else {
                res.json(doc)
            }
        })
    }

    this.getUserPolls = (req, res) => {
        let userId = req.params.userId

        pollsCollection.find({ userId: userId }).toArray((err, docs) => {
            if (err) {
                throw err
            } else {
                res.json(docs)
            }
        })
    }

    this.deletePoll = (req, res) => {
        let userId = req.session.userId
        let pollId = req.params.id
        try {
            pollId = ObjectID(req.params.id)
        } catch(err) {
            res.status(400)
                .json({ error: err })
            return
        }

        pollsCollection.findOneAndDelete({_id: pollId, userId: userId}, (err, doc) => {
            if (err) {
                throw err
            } else if (!doc.value) {
                res.status(404)
                    .send('Not Found')
            } else {
                console.log(doc);
                res.json(doc)
            }
        })
    }

    this.addOption = (req, res) => {
        let id
        try {
            id = ObjectID(req.params.id)
        } catch(err) {
            res.status(400)
                .json({ error: err })
            return
        }

        let option = req.body.option

        if (!option) {
            pollsCollection.findOne({ _id: id }, (err, doc) => {
                if (err) {
                    throw err
                } else if (!doc) {
                    res.status(404)
                        .send('Not Found')
                } else {
                    res.json(doc)
                }
            })
            return
        }

        pollsCollection.findOne({ _id: id }, (err, doc) => {
            if (err) {
                throw err
            } else if (!doc) {
                res.status(404)
                    .send('Not Found')
            } else {
                if (!(option in doc.options)) {
                    doc.options[option] = 0
                    pollsCollection.save(doc)
                    res.json(doc)
                } else {
                    res.status(409)
                        .send('Option already exist')
                }
            }
        })
    }

    this.addPoll = (req, res) => {
        let userId = req.session.userId
        if (!req.body.name || !req.body.options || req.body.options.length < 2) {
            res.status(400)
                .json({ error: "Invalid request data" })
            return
        }

        let o = {}
        req.body.options.forEach((option) => {
            o[option] = 0
        })

        let poll = {
            name: req.body.name,
            userId: userId,
            options: o,
            voters: []
        }

        pollsCollection.insertOne(poll, (err, result) => {
            if (err) {
                throw err
            }
            res.json(poll)
        })
    }

    this.vote = (req, res) => {
        let id
        try {
            id = ObjectID(req.params.id)
        } catch(err) {
            res.status(400)
                .json({ error: err })
            return
        }

        let option = req.params.option

        if (!option) {
            pollsCollection.findOne({ _id: id }, (err, doc) => {
                if (err) {
                    throw err
                } else if (!doc) {
                    res.status(404)
                        .send('Not Found')
                } else {
                    res.json(doc)
                }
            })
            return
        }

        pollsCollection.findOne({ _id: id }, (err, doc) => {
            if (err) {
                throw err
            } else if (!doc) {
                res.status(404)
                    .send('Not Found')
            } else {
                let voter = req.ip

                if (doc.voters.indexOf(voter) > -1) {
                    res.status(409)
                        .send('You already voted')
                } else if (option in doc.options) {
                    doc.options[option]++
                    doc.voters.push(voter)
                    pollsCollection.save(doc)
                    res.json(doc)
                } else {
                    res.status(404)
                        .send('Not Found')
                }
            }
        })
    }
}

module.exports = pollsHandler
