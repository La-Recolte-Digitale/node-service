require('module-alias/register')
require('@service/utils/sentry')

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { gracefulStart, gracefulShutdown } = require('@service/utils/server')
const routes = require('./routes')
const {
  mongooseErrorHandler,
  validationErrorHandler,
  duplicateKeyErrorHandler,
  requestErrorHandler,
  unprocessableEntityHandler,
  entityNotFoundHandler,
  errorHandler
} = require('@la-recolte/error-middleware')

const api = express()

api.use(cors())
api.use(bodyParser.urlencoded({ extended: true }))
api.use(bodyParser.json())

api.use(routes)

// Error management
api.use(unprocessableEntityHandler)
api.use(mongooseErrorHandler)
api.use(validationErrorHandler)
api.use(duplicateKeyErrorHandler)
api.use(requestErrorHandler)
api.use(entityNotFoundHandler)
api.use(errorHandler)

/* istanbul ignore next */
if (!module.parent) {
  try {
    gracefulStart({ api })
  } catch (error) {
    console.error('GracefulStart failed:', error)
  }
}

const sigs = ['SIGINT', 'SIGTERM', 'SIGQUIT']
sigs.forEach(sig => {
  process.on(sig, gracefulShutdown)
})

module.exports = api
