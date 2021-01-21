const { ObjectId } = require('mongoose').Types
const { ValidationError, ERROR_MESSAGES } = require('@service/errors')

const validateParameters = async (req, res, next) => {
  const { id } = req.params
  const isId = ObjectId.isValid(id)
  if (!isId) {
    const err = new ValidationError(ERROR_MESSAGES.id_is_invalid)
    next(err)
  }
  next()
}

module.exports = { validateParameters }
