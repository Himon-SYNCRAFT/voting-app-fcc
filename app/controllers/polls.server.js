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
        if (!req.body.name || !req.body.options || req.body.options.length < 2) {
            res.status(400)
                .json({ error: "Invalid request data" })
            return
        }

        let options = req.body.options.map((option) => {
            let o = {}
            o[option] = 0
            return o
        })

        let poll = {
            name: req.body.name,
            options
        }

        pollsCollection.insertOne(poll, (err, result) => {
            if (err) {
                throw err
            }
            res.json(result)
        })
    }
}

module.exports = pollsHandler
