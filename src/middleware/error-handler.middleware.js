const {
  RequestError,
  DuplicatedKeyError,
  UnprocessableEntityError
} = require('../errors')
var mongoose = require('mongoose')
const logger = require('../utils/logger')
const {
  ValidationError
} = mongoose.Error

const mongooseErrorHandler = (err, req, res, next) => {
  // Handle other errors from mongoose
  if (err.name === 'CastError' || err.name === 'ValidationError') {
    res.status(400).json({
      error: { message: err.message || 'Mongoose error' }
    })
    return
  }
  next(err)
}

const unprocessableEntityHandler = (err, req, res, next) => {
  // Handle validation errors from mongoose
  if (err instanceof UnprocessableEntityError) {
    res.status(err.statusCode).json({
      error: {
        message: err.message
      }
    })
    return
  }
  next(err)
}

const validationErrorHandler = (err, req, res, next) => {
  // Handle validation errors from mongoose
  if (err instanceof ValidationError) {
    const message = Object.keys(err.errors)
      .map(error => error.kind === 'required'
        ? `${error.path} is required`
        : `${error.path} is invalid`
      ).join('\n')
    res.status(400).json({
      error: { message: message }
    })
    return
  }
  next(err)
}

const duplicateKeyErrorHandler = (err, req, res, next) => {
  // Handle validation errors from mongoose
  if (err instanceof DuplicatedKeyError) {
    res.status(400).json({
      error: {
        message: err.message
      }
    })
    return
  }
  next(err)
}

const requestErrorHandler = (err, req, res, next) => {
  // Handle validation errors from mongoose
  if (err instanceof RequestError && err.statusCode !== 500) {
    res.status(err.statusCode).json({
      error: {
        message: err.message || 'Unhandled mongoose error'
      }
    })
    return
  }
  next(err)
}

const errorHandler = (err, req, res, next) => {
  logger.error(err)
  res.status(500).json({
    error: {
      name: err.name,
      message: err.message,
      stack: err.stack
    }
  })
}

module.exports = {
  validationErrorHandler,
  duplicateKeyErrorHandler,
  requestErrorHandler,
  errorHandler,
  mongooseErrorHandler,
  unprocessableEntityHandler
}
