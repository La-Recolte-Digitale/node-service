const mongoose = require('mongoose')
const logger = require('../utils/logger')

const Schema = mongoose.Schema

const DemoSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: false
    }
  },
  { collection: 'demos', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

DemoSchema.set('toObject', { getters: true, virtuals: true })
DemoSchema.set('toJSON', { getters: true, virtuals: true })

const demoModel = mongoose.model('Demo', DemoSchema)

demoModel.on('index', error => {
  if (error) logger.warn(error.message)
})

module.exports = demoModel
