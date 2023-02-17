const express = require('express')
const category = require('../../models/category')
const router = express.Router()
const Category = require('../../models/category')
const Expense = require('../../models/expense')

// show all expense and drop-down menu on index page
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
        // 把每一筆pexpense的紀錄中的價格抓出來相加
        totalAmount += expense[i].amount

        for(let x = 0; x < categories.length; x++) {
          // 讓type由object轉為string(?)，如果id相等將categories中的icon加到expense中
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

// use drop-down menu show specific category
router.post('/',  async(req, res) => {
  let categories = await Category.find().lean()
  let allExpense = {}
  let totalAmount = 0
  // 取得使用者選擇的類別
  const menu = req.body.menu
  // 從資料庫抓出符合該類別的資料
  Expense.find({ categoryId: menu })
    .lean()
    .then(expense => {
      // 找出與使用者選擇的類別相符的icon string
      let icon = ''      
      categories.map(category => {
        if (`${category._id}` === `${menu}`) {
          icon = category.icon
        }
      })
      // 處理每一筆expense的icon,amount,date format
      expense.map(expenseItem => {
        // 給每一筆expense record加上icon的property
        expenseItem.icon = icon
        // 把每一筆expense的紀錄抓出來修改date format
        expenseItem.date = expenseItem.date.toISOString().slice(0, 10).replace(/-/g,'/')
        // 把每一筆pexpense的紀錄中的價格抓出來相加
        totalAmount += expenseItem.amount
      })
      return allExpense = expense
    })
    .then(() => res.render('index', { expense:allExpense, categories, totalAmount }))
    .catch(err => console.log(err))
})

module.exports = router
