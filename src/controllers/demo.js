const validator = require('validator')

const Demo = require('../models/demo')
const {
  ERROR_MESSAGES,
  BadRequestError,
  NotFoundError
} = require('../errors')

exports.validateParameters = (req, res, next) => {
  if (!req.params.id || req.params.id === undefined) {
    throw new BadRequestError(ERROR_MESSAGES.id_is_required)
  }
  next()
}

const asyncAction = (action) => (req, res, next) => action(req, res, next).catch(next)

exports.list = asyncAction(async (req, res) => {
  let demos = await Demo.apiQuery(req.query)
  .select('name email phone odooId')
  res.json({ demos: demos })
})

exports.get = asyncAction(async (req, res) => {
  let demo = await Demo.findById(req.params.id)
  res.json(demo)
})

exports.put = asyncAction(async (req, res, next) => {
  const data = req.body || {}

  let demo = await Demo.findByIdAndUpdate({ _id: req.params.id }, data, { new: true })
  if (!demo) {
    throw new NotFoundError(ERROR_MESSAGES.not_found)
  }
  res.json(demo)
})

exports.post = asyncAction(async (req, res) => {
  const data = req.body || {}

  let demo = await Demo.create(data)
  res.json(demo)
})

exports.delete = asyncAction(async (req, res) => {
  await Demo.deleteOne({ _id: req.params.id })
  res.status(204).send()
})

exports.deleteAll = asyncAction(async (req, res) => {
  await Demo.deleteMany({})
  return res.status(204).send()
})

module.exports = exports
