'use strict'

let express = require('express')
let mongo = require('mongodb').MongoClient
let bodyParser = require('body-parser')
let routes = require('./app/routes/index.js')

let app = express()
const port = process.env.PORT || 3000
const connectionString = 'mongodb://tutorial:tutorial@ds151137.mlab.com:51137/clementine'

mongo.connect(connectionString, (err, db) => {
    if (err) {
        throw new Error('Database failed to connect!')
    } else {
        console.log('Connected to MongoDB on port 51137')
    }

    app.set('views', './app/views')
    app.set('view engine', 'pug')

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))

    app.use('/public', express.static(process.cwd() + '/public'))
    app.use('/controllers', express.static(process.cwd() + '/app/controllers'))

    routes(app, db)

    app.listen(port, () => {
        console.log('Listen on port ' + port);
    })
})
