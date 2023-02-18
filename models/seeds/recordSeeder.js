if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const bcrypt = require('bcryptjs')
const User = require('../user')
const Expense = require('../expense')
const Category = require('../category')
const db = require('../../config/mongoose')

const SEED_USER = {
  name: 'test',
  email: 'test@example.com',
  password: '123'
}

db.once('open', async() => {
  const categories = await Category.find().lean()
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    }))
    .then(user => {// 這個user是怎麼來的???
      const userId = user._id
      return Promise.all(Array.from(
        { length: 5 }, (_, i) => 
          Expense.create({
           name: `name-${i}`,
           date: new Date(),
           amount: 10,
           categoryId: categories[i]._id,
           userId
          })
      ))
    })
    .then(() => {
      console.log('record done')
      process.exit()
    })
    .catch(err => console.log(err))
})
