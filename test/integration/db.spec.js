let db = require('../../src/utils/db')
let logger = require('../../src/utils/logger')
jest.mock('../../src/utils/logger')

const timeout = (seconds) => {
  return new Promise(resolve => setTimeout(resolve, 1000 * seconds))
}

jest.setTimeout(60000)

const OLD_ENV = process.env

beforeEach(async () => {
  jest.resetModules()
  logger.info.mockClear()
  process.env = { ...OLD_ENV }
  delete process.env.DB_URI
})

afterEach(async () => {
  await db.closeConnection()
})

describe('Database', () => {
  describe('Connection', () => {
    it('is opened and closed', async () => {
      await db.init()
      await timeout(1)
      expect(logger.info).toHaveBeenNthCalledWith(1, 'Mongoose default connection is open')
    })
    it('has error', async () => {
      delete process.env.DB_URI
      process.env.DB_URI = 'mongodb://database:27018/db'
      process.env.NODE_ENV = 'test'
      const config = require('../../config/config')
      db = require('../../src/utils/db')
      logger = require('../../src/utils/logger')
      jest.mock('../../src/utils/logger')
      expect(config.database.uri).toBe('mongodb://database:27018/db')
      await db.init()
      await timeout(1)
      expect(logger.info).toHaveBeenNthCalledWith(2, 'Cannot connect to database')
      expect(logger.info).toHaveBeenNthCalledWith(3, 'An error on mongoose default connection has occurred')
    })
  })
})
