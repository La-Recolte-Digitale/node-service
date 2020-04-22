const demoModel = require('./demo.model')

const list = async ({ filter, skip, limit, sort, projection }) => {
    const demos = await demoModel.find(filter)
        .skip(skip)
        .limit(limit)
        .sort(sort)
        .select(projection)
        .exec()
    return demos
}

const post = async demo => await demoModel.create(demo)

module.exports = { list, post }
