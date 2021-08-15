const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')
const { dateFormatter } = require('../../public/tools')

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
        record.date = dateFormatter(record.date)
        totalAmount += record.amount
        record.icon = categoryData[record.category]
      })
      res.render('index', { records, totalAmount, categories })
    })
    .catch(error => console.error(error))
})

// filter by category & month
router.get('/filter', async (req, res) => {
  try {
    const userId = req.user._id
    const categorySelect = req.query.category
    const monthSelect = Number(req.query.month)
    const categories = await Category.find().lean()
    const categoryData = {}
    let totalAmount = 0

    categories.forEach(category => categoryData[category.Name] = category.icon)

    const filterQuery = {
      userId: userId
    }

    categorySelect ? filterQuery.category = categorySelect : ''
    monthSelect ? filterQuery.month = monthSelect : ''

    const records = await Record.aggregate([
      { $project: { name: 1, date: 1, category: 1, amount: 1, merchant: 1, userId: 1, month: { $month: '$date' } } },
      { $match: filterQuery }
    ])

    records.forEach(record => {
      record.date = dateFormatter(record.date)
      totalAmount += record.amount
      record.icon = categoryData[record.category]
    })

    return res.render('index', { records, totalAmount, categorySelect, monthSelect, categories })
  } catch (error) {
    console.log(error)
  }
})

module.exports = router