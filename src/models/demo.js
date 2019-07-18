const mongoose = require('mongoose')
const mongooseStringQuery = require('mongoose-string-query')

const Schema = mongoose.Schema

const DemoSchema = new Schema(
  {
    name: {
      type: String
    }
  },
{ collection: 'demos', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

DemoSchema.plugin(mongooseStringQuery)

module.exports = exports = mongoose.model('Demo', DemoSchema)
