const mongoose = require('mongoose')
const Category = require('../category')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  const categories = [
    { name: '家居物業', icon: 'fa-house' },
    { name: '交通出行', icon: 'fa-van-shuttle' },
    { name: '休閒娛樂', icon: 'fa-face-grin-beam' },
    { name: '餐飲食品', icon: 'fa-solid fa-utensils' },
    { name: '其他', icon: 'fa-solid fa-pen' }
  ]
  for (let i = 0; i < categories.length; i++) {
    const name = categories[i].name
    const icon = categories[i].icon
    Category.create({ name, icon })
  }
  console.log('done')
})
