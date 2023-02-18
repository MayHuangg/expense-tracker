const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const routes = require('./routes')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const usePassport = require('./config/passport')

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

// 依照登入狀態切換"登入""登出"的字樣//要再查查看為甚麼只有這個要加入next
app.use((req, res ,next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
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
