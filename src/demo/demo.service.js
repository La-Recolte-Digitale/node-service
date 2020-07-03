const demoModel = require('./demo.model')

exports.list = ({ filter, skip, limit, sort, projection }) => {
  const demos = demoModel.find(filter)
    .skip(skip)
    .limit(limit)
    .sort(sort)
    .select(projection)
    .lean()
    .exec()
  return demos
}

exports.getTotalCount = ({ filter }) => {
  return demoModel.count(filter).exec()
}

exports.findById = id => {
  const demo = demoModel.findById(id).lean()
  return demo
}

exports.updateById = ({ id, data }) => {
  const demo = demoModel.findByIdAndUpdate(
    { _id: id },
    data,
    { new: true, runValidators: true }
  )
  return demo
}

exports.replaceOne = ({ id, data }) => {
  const demo = demoModel.findByIdAndUpdate(
    { _id: id },
    data,
    {
      new: true,
      runValidators: true,
      overwrite: true
    }
  )
  return demo
}

exports.create = async data => {
  const demo = demoModel.create(data)
  return demo
}

exports.deleteById = async id => {
  const deleteResult = demoModel.deleteOne({ _id: id })
  return deleteResult
}

module.exports = exports
