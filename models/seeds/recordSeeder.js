const mongoose = require('mongoose')
const Record = require('../record')
const recordData = require('../seeds/recordSample.json')

mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
  recordData.forEach(data => {
    Record.create({
      name: data.name,
      date: data.date,
      category: data.category,
      amount: data.amount
    })
  })
  console.log('data created!')
})