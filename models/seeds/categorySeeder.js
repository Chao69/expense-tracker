const mongoose = require('mongoose')
const Category = require('../category')
const categoryData = require('./categorySample.json')

const db = require('../../config/mongoose')

db.once('open', () => {
  Category.create(categoryData)
    .then(() => {
      console.log('category seeder created!')
      return db.close()
    })
    .catch(error => console.log.error(error))
})

