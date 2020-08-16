module.exports = {
  sentry: {
    debug: process.env.SENTRY_DEBUG || false,
    sampleRate: process.env.SENTRY_SAMPLE_RATE || 1,
    dsn: process.env.SENTRY_SERVICE_DSN
  },
  database: {
    uri: process.env.DB_URI || 'mongodb://database:27017/node-template-db-test',
    options: {
      useUnifiedTopology: true,
      useNewUrlParser: true
    }
  },
  server: { port: process.env.PORT || 3000 },
  env: process.env.NODE_ENV || 'development'
}
