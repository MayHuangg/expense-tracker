const express = require('express')
const router = express.Router()
const Category = require('../../models/category')
const Expense = require('../../models/expense')

router.get('/', async(req, res) => {
  let categories = await Category.find().lean()
  let allExpense = {}
  let totalAmount = 0

  Expense.find()
    .lean()
    .then(expense => {
      for (let i = 0; i < expense.length; i++) {
        // 把每一筆expense的紀錄抓出來修改date format
        expense[i].date = expense[i].date.toISOString().slice(0, 10).replace(/-/g,'/')
        totalAmount += expense[i].amount
        for(let x = 0; x < categories.length; x++) {
          // 讓type由object轉為string(?)
          if (`${expense[i].categoryId}` === `${categories[x]._id}`) {
            expense[i].icon = categories[x].icon
          }
        }
      }
      return allExpense = expense
    })
    .then(() => {res.render('index', { expense: allExpense, categories, totalAmount })}
)
    .catch(err => console.log(err))
})

module.exports = router
