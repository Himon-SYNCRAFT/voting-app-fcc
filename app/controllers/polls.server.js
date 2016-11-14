'use strict'

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
}

module.exports = pollsHandler
