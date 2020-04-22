const aqp = require('api-query-params')
const Demo = require('./demo.model')
const {
    ERROR_MESSAGES,
    NotFoundError
} = require('../errors')
const { asyncAction } = require('../utils/request')

exports.list = asyncAction(async (req, res) => {
    const { filter, skip, limit, sort, projection } = aqp(req.query)
    const demos = await Demo.find(filter)
        .skip(skip)
        .limit(limit)
        .sort(sort)
        .select(projection)
        .exec()

    res.json({ demos: demos })
})

exports.get = asyncAction(async (req, res) => {

    const demo = await Demo.findById(req.params.id)
    if (!demo) {
        throw new NotFoundError(ERROR_MESSAGES.not_found)
    }

    res.json(demo)
})

exports.put = asyncAction(async (req, res, next) => {
    const data = req.body || {}

    const demo = await Demo.findByIdAndUpdate({ _id: req.params.id }, data, { new: true, runValidators: true })
    if (!demo) {
        throw new NotFoundError(ERROR_MESSAGES.not_found)
    }

    res.json(demo)
})

exports.post = asyncAction(async (req, res) => {
    const data = req.body || {}

    const demo = await Demo.create(data)
    res.json(demo)
})

exports.delete = async (req, res) => {
    await Demo.deleteOne({ _id: req.params.id })
    res.status(204).send()
}

exports.deleteAll = asyncAction(async (req, res) => {
    await Demo.deleteMany({})
    return res.status(204).send()
})

module.exports = exports