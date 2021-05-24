const mongoose = require('mongoose')
const mongooseLeanVirtuals = require('mongoose-lean-virtuals')
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
  { collection: 'demos', timestamps: true }
)

DemoSchema.set('toObject', { getters: true, virtuals: true })
DemoSchema.set('toJSON', { getters: true, virtuals: true })
DemoSchema.plugin(mongooseLeanVirtuals)

const demoModel = mongoose.model('Demo', DemoSchema)

demoModel.on('index', error => {
  if (error) logger.warn(error.message)
})

module.exports = demoModel
