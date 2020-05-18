const Sentry = require('@sentry/node')
const Integrations = require('@sentry/integrations')
const config = require('../../config/config').sentry.service

let isActiveSentry = config.sampleRate
if (!isActiveSentry) {
  ['staging', 'production'].includes(process.env.NODE_ENV)
    ? isActiveSentry = 1
    : isActiveSentry = 0
}

Sentry.init({
  dsn: config.dsn,
  environment: process.env.NODE_ENV,
  integrations: [
    new Integrations.CaptureConsole({
      levels: ['debug', 'info', 'warn', 'error', 'fatal']
    })
  ],
  maxBreadcrumbs: 50,
  attachStacktrace: true,
  debug: config.debug,
  sampleRate: isActiveSentry
})

module.exports = Sentry
