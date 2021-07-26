const Record = require('../record')
const recordData = require('./recordSample.json')

const db = require('../../config/mongoose')

db.once('open', () => {
  Record.create(recordData)
    .then(() => {
      console.log('record seeder created!')
      return db.close()
    })
    .catch(error => console.error(error))
})

