const mongoose = require('mongoose')
//const config = require('../../config/config')

const timeout = (seconds) => {
  return new Promise(resolve => setTimeout(resolve, 1000 * seconds))
}

jest.setTimeout(60000)

global.console = {
  log: jest.fn(),
  info: jest.fn(),
  error: jest.fn()
}
const OLD_ENV = process.env;

beforeAll(async () => {
})

afterAll(async () => {
})

beforeEach(async () => {
  jest.resetModules()
  process.env = { ...OLD_ENV };
  delete process.env.DB_URI;
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
      expect(global.console.log).toHaveBeenNthCalledWith(1, 'info: Mongoose default connection is open {\"service\":\"node-template-service\"}')
    })
    it('has error', async () => {
      delete process.env.DB_URI
      process.env.DB_URI = 'mongodb://database:27018/db'
      const config = require('../../config/config')
      expect(config.database.uri).toBe('mongodb://database:27018/db')
      await require('../../src/utils/db').init()
      await timeout(1)
      expect(global.console.log).toHaveBeenNthCalledWith(4, 'info: Cannot connect to database {\"service\":\"node-template-service\"}')
      expect(global.console.log).toHaveBeenNthCalledWith(5, 'info: An error on mongoose default connection has occurred {\"service\":\"node-template-service\"}')
    })
  })
})
