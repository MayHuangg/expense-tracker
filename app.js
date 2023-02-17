const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const routes = require('./routes')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')

// set server
const port = 3000
app.listen(port, () => {
  console.log(`the appliecation is running on port ${port}`)
})

// set veiw engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(session({
  secret: 'thisIsSecret',
  resave: false,
  saveUninitialized: true
}))

// 取得req.body中的資料
app.use(bodyParser.urlencoded({ extended: true }))

// connect database
require('./config/mongoose')

// 讓put,delete等詞得以使用(?)
app.use(methodOverride('_method'))

// 用routers導向不同的頁面
app.use(routes)
