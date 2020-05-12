const router = require('express').Router({ strict: true })
const demo = require('./demo/demo.routes')

router.use('/demo', demo)
router.get('/healthz', async (req, res) => {
  return res.status(200).json({ status: 'ok' })
})

module.exports = router
