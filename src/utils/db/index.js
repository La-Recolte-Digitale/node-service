const mongoose = require('mongoose')

const config = require('../../../config/config')
const logger = require('../logger')

mongoose.Promise = global.Promise
mongoose.set('useFindAndModify', false);

const connection = mongoose.connect(config.database.uri, config.database.options)

mongoose.connection.on('connected', function () {
  logger.info('Mongoose default connection is open')
})

mongoose.connection.on('error', function (err) {
  logger.error(`Mongoose default connection has occured ${err} error`)
  if (err.name === 'MongoNetworkError') {
    logger.info('Attempting to re-establish database connection.')

    setTimeout(function () {
      logger.info('Retrying first connect...')
      mongoose.connect(config.database.uri, config.database.options)
    }, 5 * 1000)
  }
})

mongoose.connection.on('disconnected', function () {
  logger.info('Mongoose default connection is disconnected')
})

module.exports = connection
