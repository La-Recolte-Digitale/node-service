const router = require('express').Router()
const controller = require('./demo.controller')
const { validateParameters } = require('./demo.middleware')

router.get('/', controller.list)
router.get('/:id', validateParameters, controller.get)
router.post('/', controller.post)
router.put('/:id', validateParameters, controller.put)
router.patch('/:id', validateParameters, controller.patch)
router.delete('/:id', validateParameters, controller.delete)
router.delete('/', controller.deleteAll)

module.exports = router
