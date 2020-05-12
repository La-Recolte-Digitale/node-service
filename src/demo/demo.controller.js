const aqp = require('api-query-params')
const demoService = require('./demo.service')
const {
  ERROR_MESSAGES,
  NotFoundError
} = require('../errors')
const { asyncAction } = require('../utils/request')

exports.list = asyncAction(async (req, res) => {
  const { filter, skip, limit, sort, projection } = aqp(req.query)
  const demos = await demoService.list({ filter, skip, limit, sort, projection })
  res.json({ demos: demos })
})

exports.get = asyncAction(async (req, res) => {
  const { id } = req.params
  const demo = await demoService.findById(id)
  if (!demo) {
    throw new NotFoundError(ERROR_MESSAGES.not_found)
  }
  res.json(demo)
})

exports.post = asyncAction(async (req, res) => {
  const data = req.body || {}

  const demo = await demoService.create(data)
  res.json(demo)
})

exports.put = asyncAction(async (req, res, next) => {
  const data = req.body || {}
  const { id } = req.params

  const demo = await demoService.replaceOne({ id, data })

  if (!demo) {
    throw new NotFoundError(ERROR_MESSAGES.not_found)
  }

  res.json(demo)
})

exports.patch = asyncAction(async (req, res) => {
  const data = req.body || {}
  const { id } = req.params

  const demo = await demoService.updateById({ id, data })
  if (!demo) {
    throw new NotFoundError(ERROR_MESSAGES.not_found)
  }

  res.json(demo)
})

exports.delete = asyncAction(async (req, res) => {
  const { id } = req.params
  await demoService.deleteById(id)
  res.status(204).send()
})

exports.deleteAll = asyncAction(async (req, res) => {
  await demoService.deleteAll()
  return res.status(204).send()
})

module.exports = exports
