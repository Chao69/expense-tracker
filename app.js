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

app.listen(3000, () => {
  console.log('Express is running on http://localhost:3000')
})