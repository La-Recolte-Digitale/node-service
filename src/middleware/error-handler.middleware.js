const logger = require('../utils/logger')

/* istanbul ignore next */
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

/* istanbul ignore next */
const unprocessableEntityHandler = (err, req, res, next) => {
  // Handle validation errors from mongoose
  if (err.name === 'UnprocessableEntityError') {
    res.status(err.statusCode).json({
      error: {
        message: err.message
      }
    })
    return
  }
  next(err)
}

/* istanbul ignore next */
const entityNotFoundHandler = (err, req, res, next) => {
  // Handle validation errors from mongoose
  if (err.name === 'NotFound') {
    res.status(404).json({
      error: {
        message: err.message
      }
    })
    return
  }
  next(err)
}

/* istanbul ignore next */
const validationErrorHandler = (err, req, res, next) => {
  // Handle validation errors from mongoose
  if (err.name === 'ValidationError') {
    logger.error(err.errors, Object.keys(err.errors))
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

/* istanbul ignore next */
const duplicateKeyErrorHandler = (err, req, res, next) => {
  // Handle validation errors from mongoose
  if (err.name === 'DuplicatedKeyError') {
    res.status(400).json({
      error: {
        message: err.message
      }
    })
    return
  }
  next(err)
}

/* istanbul ignore next */
const requestErrorHandler = (err, req, res, next) => {
  // Handle validation errors from mongoose
  if (err.name === 'RequestError' && err.statusCode !== 500) {
    res.status(err.statusCode).json({
      error: {
        message: err.message || 'Unhandled mongoose error'
      }
    })
    return
  }
  next(err)
}

/* istanbul ignore next */
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
  unprocessableEntityHandler,
  entityNotFoundHandler
}
