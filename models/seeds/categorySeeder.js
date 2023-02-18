const Category = require('../category')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')
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
  process.exit()//不加這行連線就不會結束，就無法順利跑到recordSeeder
})
