const Demo = require('./controllers/demo')

module.exports = api => {
  api.route('/demo').get(Demo.list)
  api.route('/demo/:id').get(Demo.validateParameters, Demo.get)
  api.route('/demo/:id').put(Demo.validateParameters, Demo.put)
  api.route('/demo').post(Demo.post)
  api.route('/demo/:id').delete(Demo.validateParameters, Demo.delete)
  api.route('/demo').delete(Demo.deleteAll)
}
