const express = require('express')

const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

// use data seed to render home page
router.get('/', async (req, res) => {
  const userId = req.user._id
  const categories = await Category.find().lean()
  const categoryData = {}
  categories.forEach(category => categoryData[category.name] = category.icon)

  Record.find({ userId })
    .sort({ date: 'asc' })
    .lean()
    .then((records) => {
      let totalAmount = 0
      records.map(record => {
        totalAmount += record.amount
        record.icon = categoryData[record.category]
      })
      res.render('index', { records, totalAmount, categories })
    })
    .catch(error => console.error(error))
})

// filter by category
router.get('/filter', async (req, res) => {
  const userId = req.user._id
  const categorySelect = req.query.category
  const categories = await Category.find({ userId }).lean()
  const category = await Category.findOne({ categorySelect, userId })
  const categoryData = {}
  categories.forEach(category => categoryData[category.name] = category.icon)

  if (!categorySelect) return res.redirect('/')

  return Record.find({ category: categorySelect, userId })
    .sort({ date: 'asc' })
    .lean()
    .then(records => {
      let totalAmount = 0
      records.map(record => {
        totalAmount += record.amount
        record.icon = categoryData[record.category]
      })
      res.render('index', { records, totalAmount, categories, categorySelect })
    })
    .catch(error => console.error(error))
})

module.exports = router