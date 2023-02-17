const express = require('express')
const router = express.Router()
const Category = require('../../models/category')
const Expense = require('../../models/expense')

// 進入新增支出的頁面
router.get('/new', (req, res) => {
  Category.find()
    .lean()
    .then(categories => res.render('new', { categories }))
    .catch(err => console.log(err))
})
// 將使用者輸入的新增支出資料傳來後端
router.post('/', (req, res) => {
  const { name, date, category, amount } = req.body
  Expense.create({ name, date, categoryId:category, amount })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})
// 進入修改資料的頁面
router.get('/:id/edit', async(req, res) => {
  const _id = req.params.id
  const categories = await Category.find().lean()
  let expense = {}
  Expense.findById(_id)
    .lean()
    .then((data) => {
      // 從category的db抓出種類名稱，給抓出的資料另建屬性並放入值
      categories.map(category => {
        if (`${category._id}` === `${data.categoryId}`) {
          data.category = category.name
        }
      })
      // 修改日期的格式，好讓它能成為預設值顯示出來(需變成2022-09-09這種格式)
      data.date = data.date.toISOString().slice(0, 10)

      return expense = data
    })
    .then(() => res.render('edit', { expense, categories }))
})

// 將使用者修改完成的資料傳到後端
router.put('/:id', async(req, res) => {
  const {name, date, categoryId, amount} = req.body
  const _id = req.params.id
  // 不知道為何這裡沒辦法用.save()，似乎和model和document有關
  // https://masteringjs.io/tutorials/mongoose/update
  Expense.updateOne({ _id },{name, date, categoryId, amount})
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))  
})

// 將使用者欲刪除的資料自資料庫刪除
router.delete('/:id', (req, res) => {
  const _id = req.params.id
  Expense.findById({ _id })
    .then(data=> data.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log(data))
})

module.exports = router
