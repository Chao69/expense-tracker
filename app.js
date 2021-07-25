const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const Record = require('./models/record')
const Category = require('./models/category')
const bodyParser = require('body-parser')
const app = express()

mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('handlebars', exphbs({ defaultLayout: 'main', extname: '.handlebars' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))

// use data seed to render home page
app.get('/', (req, res) => {
  Record.find()
    .lean()
    .sort({ date: 'asc' })
    .then((records) => {
      let totalAmount = 0
      records.forEach(record => {
        totalAmount += record.amount
      })
      res.render('index', { records, totalAmount })
    })
    .catch(error => console.error(error))
})

// add new expense
app.get('/new', (req, res) => {
  Category.find()
    .lean()
    .then(categorys => {
      const categoryList = []
      categoryList.push(...categorys)
      res.render('new', { categoryList })
    })
})

app.post('/new', (req, res) => {
  const { name, date, category, amount } = req.body
  console.log(res.body)
  Record.create({ name, date, category, amount })
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

// define btn-detail function 
app.get('/records/:id', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .lean()
    .then((record) => {
      res.render('detail', { record })
    })
    .catch(error => console.error(error))
})


// define edit record function
app.get('/records/:id/edit', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .lean()
    .then(record => res.render('edit', { record }))
    .catch(error => console.error(error))
})

app.post('/records/:id/edit', (req, res) => {
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

app.listen(3000, () => {
  console.log('Express is running on http://localhost:3000')
})