const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DemoSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    }
  },
  { collection: 'demos', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

module.exports = mongoose.model('Demo', DemoSchema)
