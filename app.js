const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const routes = require('./routes')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

// set server
const port = 3000
app.listen(port, () => {
  console.log(`the appliecation is running on port ${port}`)
})

// 讓put,delete等詞得以使用(?)
app.use(methodOverride('_method'))

// set veiw engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// 取得req.body中的資料
app.use(bodyParser.urlencoded({ extended: true }))

// connect database
require('./config/mongoose')

// 用routers導向不同的頁面
app.use(routes)
