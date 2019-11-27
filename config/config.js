module.exports = {
  database: { uri: process.env.DB_URI || 'mongodb://database:27017/node-template-db-test', options: { useNewUrlParser: true } },
  server: { port: process.env.PORT || 3000 },
  env: process.env.NODE_ENV || 'development'
}
