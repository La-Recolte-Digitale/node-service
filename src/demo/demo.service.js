const demoModel = require('./demo.model')

exports.list = async ({ filter, skip, limit, sort, projection }) => {
  const demos = await demoModel.find(filter)
    .skip(skip)
    .limit(limit)
    .sort(sort)
    .select(projection)
    .exec()
  return demos
}

exports.findById = async id => {
  const demo = await demoModel.findById(id)
  return demo
}

exports.updateById = async ({ id, data }) => {
  const demo = await demoModel.findByIdAndUpdate(
    { _id: id },
    data,
    { new: true, runValidators: true }
  )
  return demo
}

exports.create = async data => {
  const demo = await demoModel.create(data)
  return demo
}

exports.deleteById = async id => {
  const deleteResult = await demoModel.deleteOne({ _id: id })
  return deleteResult
}

exports.deleteAll = async () => {
  const deleteAllResult = await demoModel.deleteMany({})
  return deleteAllResult
}

module.exports = exports
