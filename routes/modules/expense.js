const express = require('express')
const router = express.Router()
const Category = require('../../models/category')
const Expense = require('../../models/expense')

router.get('/new', (req, res) => {
  Category.find()
    .lean()
    .then(categories => res.render('new', { categories }))
    .catch(err => console.log(err))
})

router.post('/', (req, res) => {
  const { name, date, category, amount } = req.body
  console.log(name)
  Expense.create({ name, date, categoryId:category, amount })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router
