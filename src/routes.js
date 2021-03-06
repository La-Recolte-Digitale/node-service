const router = require('express').Router({ strict: true })
const demo = require('@service/demo/demo.routes')

router.use('/demos', demo)
router.get('/healthz', async (req, res) => {
  return res.status(200).json({ status: 'ok' })
})
router.get('/*', async (req, res) => {
  return res.status(404).json({ error: { message: 'Not Found' } })
})

module.exports = router
