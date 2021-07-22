const mongoose = require('mongoose')
const Category = require('../category')
const categoryData = require('./categorySample.json')

mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
  categoryData.forEach(data => {
    Category.create({
      name: data.name,
      icon: data.icon
    }).then(() => {
      console.log('category seeder create successful!')
      return db.close()
    }).then(() => {
      console.log('database connection close ...')
    }).catch(err => console.error(error))
  })
})

