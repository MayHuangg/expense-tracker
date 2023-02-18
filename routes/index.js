const express = require('express')
const router = express.Router()

const expense = require('./modules/expense')
const home = require('./modules/home')
const user = require('./modules/users')
// 用物件解構賦值把auth.js中物件裡的authenticator函式拿出來，並命名為authenticator
const { authenticator } = require('../middleware/auth')

// 放入下面當callback，讓它們在進入各router後invoke，確定認證通過後方能進入下個callback，以使用服務
router.use('/expense', authenticator, expense)
router.use('/users', user)
router.use('/', authenticator, home)

module.exports = router
