const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const routes = require('./routes')

// set server
const port = 3000
app.listen(port, () => {
  console.log(`the appliecation is running on port ${port}`)
})

// set veiw engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// routing for testing
app.get('/', (req, res) => {
  res.render('index')
})

// connect database
require('./config/mongoose')

// 用routers導向不同的頁面
app.use(routes)