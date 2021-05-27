require('module-alias/register')
require('@service/utils/sentry')

const express = require('express')
const cors = require('cors')
const { gracefulStart, gracefulShutdown } = require('@service/utils/server')
const routes = require('./routes')
const { errorMiddleware } = require('@la-recolte/error-middleware')

const api = express()

api.use(cors())
api.use(express.urlencoded({ extended: true }))
api.use(express.json())

api.use(routes)

api.use(errorMiddleware)

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
