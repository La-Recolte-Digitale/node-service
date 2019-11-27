const mongoose = require('mongoose')

const config = require('../../../config/config')
const logger = require('../logger')

const timeout = (seconds) => {
  return new Promise(resolve => setTimeout(resolve, 1000 * seconds))
}

let server

const init = async (api) => {
  if (api) {
    server = api
  }
  try {
    await mongoose.connect(config.database.uri, config.database.options)
  } catch (error) {
    logger.info('Cannot connect to database')
  }
}

const closeConnection = async () => {
  if (server) {
    await server.close()
  }
  try {
    await mongoose.connection.close()
  } catch (error) {
    logger.info('Cannot close database')
  }
}

mongoose.Promise = global.Promise
mongoose.set('useFindAndModify', false);

mongoose.connection.on('connected', async () => {
  logger.info('Mongoose default connection is open')
  if (server) {
    server = await server.listen(config.server.port)
    logger.info(`Server is listening on port: ${config.server.port}`)
  }
})

mongoose.connection.on('error', async (err) => {
  logger.info('An error on mongoose default connection has occured')
  logger.info(err)
  if (err.name === 'MongoNetworkError') {
    await timeout(5)
    logger.info('Attempting to re-establish database connection.')
    await init()
  }
})

mongoose.connection.on('disconnected', () => {
  logger.info('Mongoose default connection is disconnected')
})

module.exports = {
  init,
  closeConnection
}
