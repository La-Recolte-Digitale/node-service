const mongoose = require('mongoose')

const Schema = mongoose.Schema

const DemoSchema = new Schema(
  {
    name: {
      type: String
    }
  },
{ collection: 'demos', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

module.exports = exports = mongoose.model('Demo', DemoSchema)
