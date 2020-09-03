const { createLogger, format: { combine, timestamp, json }, transports } = require('winston')

const logger = createLogger({
  level: 'info',
  format: combine(timestamp(), json()),
  defaultMeta: { service: 'purchase-service' },
  transports: [new transports.Console()]
})

module.exports = logger
