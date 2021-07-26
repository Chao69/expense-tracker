const express = require('express')

const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

// add new record
router.get('/new', (req, res) => {
  Category.find()
    .lean()
    .then(categorys => {
      const categoryList = []
      categoryList.push(...categorys)
      res.render('new', { categoryList })
    })
})

router.post('/new', (req, res) => {
  const { name, date, category, amount } = req.body
  console.log(res.body)
  Record.create({ name, date, category, amount })
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

// define btn-detail function 
router.get('/:id', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .lean()
    .then((record) => {
      res.render('detail', { record })
    })
    .catch(error => console.error(error))
})

// define edit record function
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .lean()
    .then(record => res.render('edit', { record }))
    .catch(error => console.error(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, date, category, amount } = req.body
  return Record.findById(id)
    .then(record => {
      record.name = name
      record.date = date
      record.category = category
      record.amount = amount
      return record.save()
    })
    .then(() => res.redirect(`/records/${id}`))
    .catch(error => console.error(error))
})

// define delete function
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

module.exports = router