const logger = require('../../src/utils/logger')
jest.mock('../../src/utils/logger')

const timeout = (seconds) => {
  return new Promise(resolve => setTimeout(resolve, 1000 * seconds))
}

jest.setTimeout(60000)

const OLD_ENV = process.env

beforeEach(async () => {
  jest.resetModules()
  process.env = { ...OLD_ENV }
  delete process.env.DB_URI
})

afterEach(async () => {
  await require('../../src/utils/db').closeConnection()
})

describe('Database', () => {
  describe('Connection', () => {
    it('is opened and closed', async () => {
      process.env.DB_URI = 'mongodb://database:27017/recipe-db-test'
      await require('../../src/utils/db').init()
      await timeout(1)
      expect(logger.info).toHaveBeenNthCalledWith(1, 'Mongoose default connection is open')
    })
    it('has error', async () => {
      delete process.env.DB_URI
      process.env.DB_URI = 'mongodb://database:27018/db'
      process.env.NODE_ENV = 'test'
      const config = require('../../config/config')
      expect(config.database.uri).toBe('mongodb://database:27018/db')
      await require('../../src/utils/db').init()
      await timeout(1)
      expect(logger.info).toHaveBeenNthCalledWith(4, 'Cannot connect to database')
      expect(logger.info).toHaveBeenNthCalledWith(5, 'An error on mongoose default connection has occurred')
    })
  })
})
