const mongoose = require('mongoose')
const Category = require('../category')
const categoryData = require('./categorySample.json')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')

db.once('open', () => {
  Category.create(categoryData)
    .then(() => {
      console.log('category seeder created!')
      return db.close()
    })
    .catch(error => console.log.error(error))
})

