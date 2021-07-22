const mongoose = require('mongoose')
const Category = require('../category')
const categoryData = require('./categorySample.json')

mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  Category.create(categoryData)
    .then(() => {
      console.log('category seeder created!')
      return db.close()
    })
    .catch(error => console.log.error(error))
})

