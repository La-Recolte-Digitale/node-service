const Sentry = require('@sentry/node')
const Integrations = require('@sentry/integrations')
const { sentry: sentryConf } = require('../../config/config')

const isProductionEnv = () => {
  return ['staging', 'production'].includes(process.env.NODE_ENV)
}

let isActiveSentry = sentryConf.sampleRate
/* istanbul ignore next */
if (!isActiveSentry) {
  isProductionEnv()
    ? isActiveSentry = 1
    : isActiveSentry = 0
}

Sentry.init({
  dsn: sentryConf.dsn,
  environment: process.env.NODE_ENV,
  integrations: [
    new Integrations.CaptureConsole({
      levels: ['warn', 'error', 'fatal']
    })
  ],
  maxBreadcrumbs: 50,
  attachStacktrace: true,
  debug: sentryConf.debug,
  sampleRate: isActiveSentry
})

if (isProductionEnv()) {
  console.warn('Sentry was initialized.')
}

module.exports = Sentry
