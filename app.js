const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const routes = require('./routes')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const usePassport = require('./config/passport')
const flash = require('connect-flash')

// set server
const port = 3000
app.listen(port, () => {
  console.log(`the appliecation is running on port ${port}`)
})

// set veiw engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// authenticate
app.use(session({
  secret: 'thisIsSecret',
  resave: false,
  saveUninitialized: true
}))
usePassport(app)

// message on register and login page
app.use(flash())

// 依照登入狀態切換"登入""登出"的字樣和依狀態跳出messages on register and login page
// 要再查查看為甚麼只有這個要加入next(未釐清)
// 我原以為它似乎要放在app.use(routes)的後面(未釐清)
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

// 取得req.body中的資料
app.use(bodyParser.urlencoded({ extended: true }))

// connect database
require('./config/mongoose')

// 讓put,delete等詞得以使用(?)
app.use(methodOverride('_method'))

// 用routers導向不同的頁面
app.use(routes)
