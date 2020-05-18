const request = require('supertest')
const server = require('../../src/server')
let config = require('../../config/config')

const { gracefulStart } = require('../../src/utils/server')

const timeout = (seconds) => {
  return new Promise(resolve => setTimeout(resolve, 1000 * seconds))
}

jest.setTimeout(60000)

global.console = {
  log: jest.fn(),
  info: jest.fn(),
  error: jest.fn()
}

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
      expect(global.console.info).toHaveBeenNthCalledWith(1, `info: Mongoose default connection is open {\"service\":\"node-template-service\"}`)
      expect(global.console.info).toHaveBeenNthCalledWith(2, `info: Server is listening on port: 3005 {\"service\":\"node-template-service\"}`)
    })
    it('healthz return 200', async () => {
      const res = await request(server)
        .get('/healthz')
        .set('Accept', 'application/json')
      expect(res.statusCode).toBe(200)
    })
    it('stops gracefully on SIGQUIT', async () => {
      process.emit('SIGQUIT');
      await timeout(1)
      expect(global.console.info).toHaveBeenNthCalledWith(3, 'info: [GRACEFUL SHUTDOWN] - Server is closed {\"service\":\"node-template-service\"}')
      expect(global.console.info).toHaveBeenNthCalledWith(5, 'info: [GRACEFUL SHUTDOWN] - Mongoose default connection is disconnected due to application termination {\"service\":\"node-template-service\"}')
    })
  })
})
