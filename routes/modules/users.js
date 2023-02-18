const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  let errors = []
  // 當任一欄位填寫不完全時
  if (!name || !email || !password|| !confirmPassword) {
    errors.push({ message: '所有欄位皆為必填。'})
  }
  // 當password與confirmPassword不一致時
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不一致。'})    
  }
  // 當有error message時render register page
  if (errors.length) {
    return res.render('register',{errors, name, email, password, confirmPassword})
  }
  User.findOne({ email })
    .then(user => {
      // 如果使用者已註冊
      if (user) {
        errors.push({ message: '此Email已註冊過了。'})
        //如果使用者有欄位未填寫+Email已註冊過的話，只會跳出未填寫的提醒訊息，不會跳出已註冊過的提醒訊息
        res.render('register', {
          errors, name, email, password, confirmPassword
        })
      } else {
        // 如果尚未註冊，則將資料寫入資料庫
        bcrypt.genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({ name, email, password: hash }))
        .then(() => res.redirect('/users/login'))
        .catch(err => console.log(err))
      }
    })
    .catch(err => console.log(err))
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已經成功登出。')
  res.redirect('/users/login')
})

module.exports = router
