const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const config = require('../config/config')
const mongoose = require('mongoose')

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
  require('./utils/db')

  mongoose.connection.on('connected', () => {
    api.listen(config.server.port, err => {
      if (err) {
        console.log(err)
        process.exit(1)
      }
      console.log('listening on port: ', config.server.port)
    })
  })

  const sigs = ['SIGINT', 'SIGTERM', 'SIGQUIT']
  sigs.forEach(sig => {
    process.on(sig, () => {
      api.close(err => {
        if (err) {
          console.log(err)
          process.exit(1)
        }
        mongoose.connection.close(function () {
          console.log('Mongoose default connection is disconnected due to application termination')
          process.exit(0)
        })
      })
    })
  })
}

module.exports = api
