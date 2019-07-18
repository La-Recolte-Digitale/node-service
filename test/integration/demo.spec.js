const server = require('../../src/server')
const request = require('supertest')
const data = require('../data.json')
const mongoose = require('mongoose')

const Demo = require('../../src/models/demo')

const clearDatabase = async () => {
  await Demo.collection.drop()
}

const initializeDatabase = async () => {
  const url = process.env.MONGO_TEST_URL
  await mongoose.connect(`${url}-${Date.now()}`, { autoIndex: true, useNewUrlParser: true, useCreateIndex: true })
  await Demo.ensureIndexes()
}

mongoose.set('useFindAndModify', false);

data.demos.forEach((demo) => {
  demo._id = mongoose.Types.ObjectId(demo.id)
  if (demo.composition && demo.composition.items) {
    demo.composition.items.forEach(item => {
      item.demo = mongoose.Types.ObjectId(item.demo.toString())
    })
  }
})

let client
jest.setTimeout(60000)

beforeAll(async () => {
  initializeDatabase()
})

afterAll(async () => {
  // server.close && server.close()
})

beforeEach(async () => {
  await Demo.collection.insertMany(data.demos)
})

afterEach(async () => {
  await clearDatabase()
})

describe('demo tests', () => {
  describe('GET /demo', () => {
    test('responds with 200', async () => {
      const res = await request(server)
      .get('/demo')
      .set('Accept', 'application/json')
      expect(res.statusCode).toBe(200)
    })
  })

  describe('GET /demo/:id', () => {
    test('responds with 200', async () => {
      const res = await request(server)
      .get('/demo/' + data.demos[0].id)
      .set('Accept', 'application/json')
      expect(res.statusCode).toBe(200)
    })
  })

  describe('POST /demo', () => {
    test('responds with 200', async () => {
      const res = await request(server)
      .post('/demo')
      .send({})
      .set('Accept', 'application/json')
      expect(res.statusCode).toBe(200)
    })
  })

  describe('PUT /demo/:id', () => {
    test('responds with 200', async () => {
      const res = await request(server)
      .put('/demo/' + data.demos[0].id)
      .send(data.demos[0])
      .set('Accept', 'application/json')
      expect(res.statusCode).toBe(200)
    })
  })

  describe('DELETE with no id failed /demo', () => {
    test('responds with 404', async () => {
      const res = await request(server)
      .delete('/demo/')
      .set('Accept', 'application/json')
      expect(res.statusCode).toBe(404)
    })
  })

  describe('DELETE ALL /demo', () => {
    test('responds with 204', async () => {
      const res = await request(server)
      .delete('/demo')
      .set('Accept', 'application/json')
      expect(res.statusCode).toBe(204)
    })
  })
})
