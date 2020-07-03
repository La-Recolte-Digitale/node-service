const aqp = require('api-query-params')
const demoService = require('./demo.service')
const {
  ERROR_MESSAGES,
  NotFoundError
} = require('../errors')
const { asyncAction } = require('../utils/request')
const DEFAULT_LIMIT = 2

exports.list = asyncAction(async (req, res) => {
  let { filter, skip, limit, sort, projection } = aqp(req.query)
  limit = limit || DEFAULT_LIMIT
  const demoPromise = demoService.list({ filter, skip, limit, sort, projection })
  const countPromise = demoService.getTotalCount({ filter })
  const [demos, total] = await Promise.all([demoPromise, countPromise])
  res.json({ demos: demos, total: total })
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
  const data = req.body

  const demo = await demoService.create(data)
  res.json(demo)
})

exports.put = asyncAction(async (req, res, next) => {
  const data = req.body
  const { id } = req.params

  const demo = await demoService.replaceOne({ id, data })

  if (!demo) {
    throw new NotFoundError(ERROR_MESSAGES.not_found)
  }

  res.json(demo)
})

exports.patch = asyncAction(async (req, res) => {
  const data = req.body
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


module.exports = exports
