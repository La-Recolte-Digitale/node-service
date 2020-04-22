const router = require('express').Router()
const controller = require('./demo.controller')
const { validateParameters } = require('./demo.middleware')

router.get('/', controller.list)
router.get('/:id', controller.get)
router.put('/:id', validateParameters, controller.put)
router.post('/', controller.post)
router.delete('/:id', validateParameters, controller.delete)
router.delete('/', controller.deleteAll)

module.exports = router
