'use strict'

const express = require('express')
const mongo = require('mongodb').MongoClient
const bodyParser = require('body-parser')
const session = require('express-session')
const routes = require('./app/routes/index.js')
const compression = require('compression')

let app = express()
const port = process.env.PORT || 3000
const connectionString = 'mongodb://tutorial:tutorial@ds151137.mlab.com:51137/clementine'

mongo.connect(connectionString, (err, db) => {
    if (err) {
        throw new Error('Database failed to connect!')
    } else {
        console.log('Connected to MongoDB on port 51137')
    }

    app.use(compression())
    app.use(session({
        secret: '$2a$12$2Z.wdo.8ytoNn6b5faNAt.ywUFo5g2BmbS2FBJAUbg2iUWJc7li9q',
        resave: false,
        saveUninitialized: false
    }))
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))

    app.use('/public', express.static(process.cwd() + '/public'))

    routes(app, db)

    app.listen(port, () => {
        console.log('Listen on port ' + port);
    })
})
