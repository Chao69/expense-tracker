const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const Record = require('./models/record')
const Category = require('./models/category')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const hbshelpers = require('handlebars-helpers')
const routes = require('./routes')

const app = express()
const multihelpers = hbshelpers()

// mongodb connect
mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('handlebars', exphbs({ defaultLayout: 'main', extname: '.handlebars', helpers: multihelpers }))
app.set('view engine', 'handlebars')
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(routes)

app.listen(3000, () => {
  console.log('Express is running on http://localhost:3000')
})