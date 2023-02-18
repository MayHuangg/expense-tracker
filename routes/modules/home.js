const express = require('express')
const router = express.Router()
const Category = require('../../models/category')
const Expense = require('../../models/expense')

// show all expense and drop-down menu on index page
router.get('/', async (req, res) => {
  const categories = await Category.find().lean()
  let allExpenses = {}
  let totalAmount = 0

  Expense.find()
    .lean()
    .then(expenses => {
      for (let i = 0; i < expenses.length; i++) {
        // 把每一筆expense的紀錄抓出來修改date format
        expenses[i].date = expenses[i].date.toISOString().slice(0, 10).replace(/-/g, '/')
        // 把每一筆pexpense的紀錄中的價格抓出來相加
        totalAmount += expenses[i].amount

        for (let x = 0; x < categories.length; x++) {
          // 讓type由object轉為string(?)，如果id相等將categories中的icon加到expense中
          if (`${expenses[i].categoryId}` === `${categories[x]._id}`) {
            expenses[i].icon = categories[x].icon
          }
        }
      }
      allExpenses = expenses
    })
    .then(() => { res.render('index', { allExpenses, categories, totalAmount }) }
    )
    .catch(err => console.log(err))
})

// use drop-down menu show specific category
router.post('/', async (req, res) => {
  const categories = await Category.find().lean()
  let allExpenses = {}
  let totalAmount = 0
  // 取得使用者選擇的類別
  const { categoryId } = req.body
  // 從資料庫抓出符合該類別的資料
  Expense.find({ categoryId })
    .lean()
    .then(expenses => {
      // 找出與使用者選擇的類別相符的icon string
      let icon = ''
      categories.map(category => {
        if (`${category._id}` === `${categoryId}`) {
          icon = category.icon
        }
      })
      // 處理每一筆expense的icon,amount,date format
      expenses.map(expense => {
        // 給每一筆expense record加上icon的property
        expense.icon = icon
        // 把每一筆expense的紀錄抓出來修改date format
        expense.date = expense.date.toISOString().slice(0, 10).replace(/-/g, '/')
        // 把每一筆pexpense的紀錄中的價格抓出來相加
        totalAmount += expense.amount
      })
      allExpenses = expenses
      return allExpenses // 有加這行和沒加這行的差別
    })
    .then(() => res.render('index', { allExpenses, categories, totalAmount }))
    .catch(err => console.log(err))
})

module.exports = router
