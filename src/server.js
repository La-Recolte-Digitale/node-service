const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const logger = require('./utils/logger')

const {
  mongooseErrorHandler,
  validationErrorHandler,
  duplicateKeyErrorHandler,
  requestErrorHandler,
  unprocessableEntityHandler,
  entityNotFoundHandler,
  errorHandler
} = require('./middleware/error-handler.middleware')

const api = express()
const router = express.Router({ 'strict': true })

const gracefulStart = async () => {
  await require('./utils/db').init(api)
}

const gracefulShutdown = async () => {
  await require('./utils/db').closeConnection()
  logger.info('Mongoose default connection is disconnected due to application termination')
  if (!module.parent.filename.includes('server.spec.js')) {
    process.exit(0)
  }
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
api.use(entityNotFoundHandler)
api.use(errorHandler)

api.get('/healthz', async (req, res) => {
  return res.status(200).json({ status: 'ok' })
})

if (!module.parent || module.parent.filename.includes('server.spec.js')) {
  gracefulStart()

  const sigs = ['SIGINT', 'SIGTERM', 'SIGQUIT']
  sigs.forEach(sig => {
    process.on(sig, gracefulShutdown)
  })
}

module.exports = api
