const express = require('express')
const router = express.Router()
const Category = require('../../models/category')

router.get('/', (req, res) => {
  Category.find()
    .lean()
    .then(categories => res.render('index', { categories }))
    .catch(err => console.log(err))
})

module.exports = router
