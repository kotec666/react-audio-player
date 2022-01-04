const Router = require('express')
const router = new Router()

const trackRouter = require('./trackRouter')


router.use('/track', trackRouter)


module.exports = router