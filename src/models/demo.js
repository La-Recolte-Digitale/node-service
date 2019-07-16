const mongoose = require('mongoose')
const timestamps = require('mongoose-timestamp')
const mongooseStringQuery = require('mongoose-string-query')

const Schema = mongoose.Schema

const DemoSchema = new Schema(
  {
    name: {
      type: String
    }
  },
{ collection: 'demos' }
)

DemoSchema.plugin(timestamps)
DemoSchema.plugin(mongooseStringQuery)

module.exports = exports = mongoose.model('Demo', DemoSchema)
