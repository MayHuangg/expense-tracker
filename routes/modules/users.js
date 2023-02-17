const express = require('express')
const router = express.Router()
const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const {name, email, password, confirmPassword} = req.body
  User.findOne({ email })
    .then(user => {
      // 如果使用者已註冊
      if (user) {
        console.log('已註冊')
          res.render('register', {
          name, email, password, confirmPassword
        })
      } else {
        // 如果尚未註冊，則將資料寫入資料庫
        User.create({ name, email, password })
        .then(() => res.redirect('/users/login'))
        .catch(err => console.log(err))
      }
    })
    .catch(err => console.log(err))
})
module.exports = router