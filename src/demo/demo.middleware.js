const validateParameters = (req, res, next) => {
  if (!req.params.id || req.params.id === undefined) {
    throw new BadRequestError(ERROR_MESSAGES.id_is_required)
  }
  next()
}

module.exports = { validateParameters }
