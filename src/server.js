const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const config = require('../config/config')
const mongoose = require('mongoose')
const logger = require('./utils/logger')

const {
  mongooseErrorHandler,
  validationErrorHandler,
  duplicateKeyErrorHandler,
  requestErrorHandler,
  unprocessableEntityHandler,
  errorHandler
} = require('./middleware/error-handler.middleware')

const api = express()
const router = express.Router({ 'strict': true })
let server

const gracefulStart = () => {
  require('./utils/db')
  mongoose.connection.on('connected', async () => {
    server = await api.listen(config.server.port)
    logger.info(`listening on port: ${config.server.port}`)
  })  
}

const gracefulShutdown = async () => {
  await server.close()
  await mongoose.connection.close()
  logger.info(`Mongoose default connection is disconnected due to application termination`)
  process.exit(0)
}

api.use(cors())
api.use(bodyParser.urlencoded({ extended: true }))
api.use(bodyParser.json())

api.use(router)
require('./routes')(router)

api.use(unprocessableEntityHandler)
api.use(mongooseErrorHandler)
api.use(validationErrorHandler)
api.use(duplicateKeyErrorHandler)
api.use(requestErrorHandler)
api.use(errorHandler)

api.get('/healthz', async (req, res) => {
  return res.status(200).json({ status: 'ok' })
})

if (!module.parent) {
  gracefulStart()

  const sigs = ['SIGINT', 'SIGTERM', 'SIGQUIT']
  sigs.forEach(sig => {
    process.on(sig, gracefulShutdown)
  })
}

module.exports = api
