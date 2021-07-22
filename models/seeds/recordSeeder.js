const mongoose = require('mongoose')
const Record = require('../record')
const recordData = require('./recordSample.json')

mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  Record.create(recordData)
    .then(() => {
      console.log('record seeder created!')
      return db.close()
    })
    .catch(error => console.error(error))
})

