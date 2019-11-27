const config = require('../../config/config')
const request = require('supertest')

const timeout = (seconds) => {
  return new Promise(resolve => setTimeout(resolve, 1000 * seconds))
}

jest.setTimeout(60000)
let server

global.console = {
  log: jest.fn(),
  info: jest.fn(),
  error: jest.fn()
}

beforeAll(async () => {
  server = await require('../../src/server')
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
      await timeout(1) 
      expect(global.console.log).toHaveBeenNthCalledWith(2, `info: Server is listening on port: ${config.server.port} {\"service\":\"node-template-service\"}`)
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
      expect(global.console.log).toHaveBeenNthCalledWith(4, 'info: Mongoose default connection is disconnected due to application termination {\"service\":\"node-template-service\"}')
    })
  })
})
