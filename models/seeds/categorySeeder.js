const Category = require('../category')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const categories = [
    { name: '家居物業', icon: 'fa-house' },
    { name: '交通出行', icon: 'fa-van-shuttle' },
    { name: '休閒娛樂', icon: 'fa-face-grin-beam' },
    { name: '餐飲食品', icon: 'fa-solid fa-utensils' },
    { name: '其他', icon: 'fa-solid fa-pen' }
  ]

const db = require('../../config/mongoose')
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  // 得好好再了解一次return了...
  return Promise.all(Array.from({ length: 5 }, (_, i) =>{
    const name = categories[i].name
    const icon = categories[i].icon
    return Category.create({ name, icon })
  }))
  .then(()=> process.exit())//不加這行連線就不會結束，就無法順利跑到recordSeeder
})
