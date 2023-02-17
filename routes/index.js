const express = require('express')
const router = express.Router()

const expense = require('./modules/expense')
const home = require('./modules/home')
const user = require('./modules/user')

router.use('/expense', expense)
router.use('/user', user)
router.use('/', home)

module.exports = router
