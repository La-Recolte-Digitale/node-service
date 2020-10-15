const request = require('supertest')
const server = require('../../src/server')
const config = require('../../config/config')
const logger = require('../../src/utils/logger')
jest.mock('../../src/utils/logger')

const { gracefulStart } = require('../../src/utils/server')

const timeout = (seconds) => {
  return new Promise(resolve => setTimeout(resolve, 1000 * seconds))
}

jest.setTimeout(60000)

beforeAll(async () => {

})

afterAll(async () => {

})

beforeEach(async () => {
})

afterEach(async () => {
})

describe('Server', () => {
  describe('Graceful start and stop', () => {
    it('starts gracefully', async () => {
      config.server.port = 3005
      await gracefulStart({ api: server })
      await timeout(1)
      expect(logger.info).toHaveBeenNthCalledWith(1, 'Mongoose default connection is open')
      expect(logger.info).toHaveBeenNthCalledWith(2, 'Server is listening on port: 3005')
    })
    it('healthz return 200', async () => {
      const res = await request(server)
        .get('/healthz')
        .set('Accept', 'application/json')
      expect(res.statusCode).toBe(200)
    })
    it('return 404 on unknown routes', async () => {
      const res = await request(server)
        .get('/unknown')
        .set('Accept', 'application/json')
      expect(res.statusCode).toBe(404)
    })
    it('stops gracefully on SIGQUIT', async () => {
      process.emit('SIGQUIT')
      await timeout(1)
      expect(logger.info).toHaveBeenNthCalledWith(3, '[GRACEFUL SHUTDOWN] - Server is closed')
      expect(logger.info).toHaveBeenNthCalledWith(5, '[GRACEFUL SHUTDOWN] - Mongoose default connection is disconnected due to application termination')
    })
  })
})
