
const ERROR_MESSAGES = Object.freeze({
  id_is_required: 'id is required',
  not_found: 'Entity not found.'
})

class RequestError extends Error {
  constructor (message, name, statusCode) {
    super()
    this.statusCode = statusCode || 500
    this.name = name
    this.message = message
    Object.setPrototypeOf(this, RequestError.prototype)
  }
}

class BadRequestError extends RequestError {
  constructor (message) {
    super(message || 'Bad Request Error', 'BadRequest', 400)
    Object.setPrototypeOf(this, BadRequestError.prototype)
  }
}

class NotFoundError extends RequestError {
  constructor (message) {
    super(message || 'Not Found Error', 'NotFound', 404)
    Object.setPrototypeOf(this, NotFoundError.prototype)
  }
}

class UnprocessableEntityError extends RequestError {
  constructor (message) {
    super(message || 'Unprocessable Entity Error', 'UnprocessableEntity', 422)
    Object.setPrototypeOf(this, UnprocessableEntityError.prototype)
  }
}

class DuplicatedKeyError extends Error {
  constructor (model, field, message) {
    super()
    this.name = 'DuplicatedKeyError'
    this.model = model
    this.field = field
    this.message = message || `${this.model} with such ${this.field} already exists`
    Object.setPrototypeOf(this, DuplicatedKeyError.prototype)
  }
}

module.exports = {
  ERROR_MESSAGES,
  RequestError,
  BadRequestError,
  NotFoundError,
  UnprocessableEntityError,
  DuplicatedKeyError
}
