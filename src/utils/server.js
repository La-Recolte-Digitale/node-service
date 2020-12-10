const logger = require('./logger')
const db = require('./db')
const config = require('../../config/config')

let server

const gracefulStart = async ({ api }) => {
  // Start mongo
  await db.init()
  // Start api
  server = await api.listen(config.server.port)
  logger.info(`Server is listening on port: ${config.server.port}`)
}

const gracefulShutdown = async () => {
  await server.close()
  logger.info('[GRACEFUL SHUTDOWN] - Server is closed')
  logger.info('[GRACEFUL SHUTDOWN] - Mongoose default connection is disconnected due to application termination')
  await db.closeConnection()
}

module.exports = { gracefulStart, gracefulShutdown }
