const server = require('../../src/server')
const request = require('supertest')
const data = require('../data/demo.json')
const mongoose = require('mongoose')
const Demo = require('../../src/demo/demo.model')

const initializeDatabase = async () => {
  const url = process.env.MONGO_TEST_URL
  await mongoose.connect(`${url}-${Date.now()}`, {
    autoIndex: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  await Demo.ensureIndexes()
}

data.insertIntoDb.forEach((demo) => {
  demo._id = mongoose.Types.ObjectId(demo.id)
  if (demo.composition && demo.composition.items) {
    demo.composition.items.forEach(item => {
      item.demo = mongoose.Types.ObjectId(item.demo.toString())
    })
  }
})

jest.setTimeout(60000)

beforeAll(async () => {
  initializeDatabase()
})

afterAll(async () => {
})

beforeEach(async () => {
  await Demo.collection.insertMany(data.insertIntoDb)
})

afterEach(async () => {
  await Demo.collection.drop()
})

describe('demo tests', () => {
  describe('GET /demos', () => {
    test('responds with 200 and returns only 2 results by default', async () => {
      const res = await request(server)
        .get('/demos')
        .set('Accept', 'application/json')
      expect(res.statusCode).toBe(200)
      expect(res.body.demos.length).toBe(2)
      expect(res.body.total).toBe(3)
    })
    test('responds with 200 and returns all results when putting a limit', async () => {
      const res = await request(server)
        .get('/demos?limit=10')
        .set('Accept', 'application/json')
      expect(res.statusCode).toBe(200)
      expect(res.body.demos.length).toBe(3)
      expect(res.body.total).toBe(3)
    })
  })

  describe('GET /demos/:id', () => {
    test('responds with 200', async () => {
      const id = data.insertIntoDb[0].id
      const res = await request(server)
        .get(`/demos/${id}`)
        .set('Accept', 'application/json')
      expect(res.statusCode).toBe(200)
    })
    test('respond with 404', async () => {
      const id = "5e9ec0938777791177bd5727"
      const res = await request(server)
        .get(`/demos/${id}`)
        .set('Accept', 'application/json')
      expect(res.statusCode).toBe(404)
      expect(res.body).toMatchObject({ "error": { "message": 'Entity not found.' } })

    })
    test('not a valid mongo Id', async () => {
      const id = "Cpasbon"
      const res = await request(server)
        .get(`/demos/${id}`)
        .set('Accept', 'application/json')
      expect(res.statusCode).toBe(400)
    })
  })

  describe('GET /demos/:id', () => {
    test('responds with 200', async () => {
      const id = data.insertIntoDb[0].id
      const res = await request(server)
        .get(`/demos/${id}`)
        .set('Accept', 'application/json')
      expect(res.statusCode).toBe(200)
    })
  })

  describe('POST /demos', () => {
    test('responds with 200', async () => {
      const postData = data.postDemo.successPost

      const res = await request(server)
        .post('/demos')
        .send(postData)
        .set('Accept', 'application/json')
      expect(res.statusCode).toBe(200)
    })
    test('responds with 400', async () => {
      const res = await request(server)
        .post('/demos')
        .send()
        .set('Accept', 'application/json')
      expect(res.statusCode).toBe(400)
    })
  })

  describe('PUT /demos/:id', () => {
    test('responds with 200', async () => {
      const id = data.putDemo.id
      const putData = data.putDemo.successPut
      const res = await request(server)
        .put(`/demos/${id}`)
        .send(putData)
        .set('Accept', 'application/json')
      expect(res.statusCode).toBe(200)
    })

    test('not complete data', async () => {
      const id = data.putDemo.id
      const putData = data.putDemo.failedPut
      const res = await request(server)
        .put(`/demos/${id}`)
        .send(putData)
        .set('Accept', 'application/json')
      expect(res.statusCode).toBe(400)
    })

    test('responds with 200 (put empty)', async () => {
      const id = data.putDemo.id
      const res = await request(server)
        .put(`/demos/${id}`)
        .send()
        .set('Accept', 'application/json')
      expect(res.statusCode).toBe(400)
    })

    test('responds with incorrect id', async () => {
      const putData = data.putDemo.successPut

      const res = await request(server)
        .put('/demos/51224d776a326fb40f000003')
        .send(putData)
        .set('Accept', 'application/json')
      expect(res.statusCode).toBe(404)
    })
  })

  describe('PATCH /demos/:id', () => {
    test('responds with 200', async () => {
      const id = data.patchDemo.id
      const patchData = data.patchDemo.successPatch
      const res = await request(server)
        .patch(`/demos/${id}`)
        .send(patchData)
        .set('Accept', 'application/json')
      expect(res.statusCode).toBe(200)
    })

    test('responds with 200 (patch empty)', async () => {
      const id = data.patchDemo.id
      const res = await request(server)
        .patch(`/demos/${id}`)
        .send()
        .set('Accept', 'application/json')
      expect(res.statusCode).toBe(200)
    })

    test('responds with incorrect id', async () => {
      const patchData = data.patchDemo.successPatch

      const res = await request(server)
        .patch('/demos/61224d776a326fb40f000003')
        .send(patchData)
        .set('Accept', 'application/json')
      expect(res.statusCode).toBe(404)
    })
  })

  describe('DELETE with no id failed /demo', () => {
    test('responds with 204', async () => {
      const id = data.insertIntoDb[0].id
      const res = await request(server)
        .delete(`/demos/${id}`)
        .set('Accept', 'application/json')
      expect(res.statusCode).toBe(204)
    })
  })

  describe('DELETE ALL /demos', () => {
    test('responds with 204', async () => {
      const res = await request(server)
        .delete('/demos')
        .set('Accept', 'application/json')
      expect(res.statusCode).toBe(204)
    })
  })
})
