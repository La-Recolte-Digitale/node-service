const logger = require('../utils/logger')
const config = require('../../config/config')

const gracefulStart = async ({ api, port }) => {
  // Start the server
  await api.listen(config.server.port)
  logger.info(`Server is listening on port: ${config.server.port}`)
  // Start mongo
  await require('../utils/db').init()
}

const gracefulShutdown = async () => {
  await require('./db').closeConnection()
  logger.info('Mongoose default connection is disconnected due to application termination')
   /* istanbul ignore next */
  if (!module.parent.parent.filename.includes('server.spec.js')) {
    process.exit(0)
  }
}

module.exports = { gracefulStart, gracefulShutdown }
