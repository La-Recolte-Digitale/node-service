const mongoose = require('mongoose')

const config = require('../../../config/config')

mongoose.Promise = global.Promise

const connection = mongoose.connect(config.database.uri, config.database.options)

mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection is open')
})

mongoose.connection.on('error', function (err) {
  console.log('Mongoose default connection has occured ' + err + ' error')
  if (err.name === 'MongoNetworkError') {
    console.log('Attempting to re-establish database connection.')

    setTimeout(function () {
      console.log('Retrying first connect...')
      mongoose.connect(config.database.uri, config.database.options)
    }, 5 * 1000)
  }
})

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection is disconnected')
})

module.exports = connection
