const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const hbshelpers = require('handlebars-helpers')

const routes = require('./routes')
require('./config/mongoose')

const app = express()
const multihelpers = hbshelpers()

app.engine('handlebars', exphbs({ defaultLayout: 'main', extname: '.handlebars', helpers: multihelpers }))
app.set('view engine', 'handlebars')

app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(routes)

app.listen(3000, () => {
  console.log('Express is running on http://localhost:3000')
})