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
  const { name, date, categoryId, amount } = req.body
  const userId = req.user._id
  Expense.create({ name, date, categoryId, amount, userId })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})
// 進入修改資料的頁面
router.get('/:id/edit', async (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  const categories = await Category.find().lean()
  let expense = {}
  Expense.findOne({ _id, userId })
    .lean()
    .then((data) => {
      // 因為expense的db中只有categoryId，因此要從category的db抓出確切種類名稱
      categories.map(category => {
        if (`${category._id}` === `${data.categoryId}`) {
          data.category = category.name
        }
      })
      // 修改日期的格式，好讓它能成為預設值顯示出來(需變成2022-09-09這種格式)
      data.date = data.date.toISOString().slice(0, 10)

      expense = data
      return expense
    })
    .then(() => res.render('edit', { expense, categories }))
})

// 將使用者修改完成的資料傳到後端
router.put('/:id', async (req, res) => {
  const { name, date, categoryId, amount } = req.body
  const _id = req.params.id
  const userId = req.user._id
  // 不知道為何這裡沒辦法用.save()，似乎和model和document有關
  // https://masteringjs.io/tutorials/mongoose/update
  Expense.updateOne({ _id }, { name, date, categoryId, amount, userId })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

// 將使用者欲刪除的資料自資料庫刪除
router.delete('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id

  Expense.findById({ _id, userId })
    .then(data => data.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router
