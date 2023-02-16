const express = require('express')
const router = express.Router()

const expense = require('./modules/expense')

router.use('/expense', expense)

module.exports = router
