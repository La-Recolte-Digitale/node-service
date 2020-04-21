const logger = require('../utils/logger')
const config = require('../../config/config')

const gracefulStart = async ({ api, port }) => {
    // Start the server
    await api.listen(config.server.port)
    logger.info(`Server is listening on port: ${config.server.port}`)
    // Start mongo
    await require('../utils/db').init()
}

module.exports = { gracefulStart }