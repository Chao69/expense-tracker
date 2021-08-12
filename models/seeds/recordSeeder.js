const bcrypt = require('bcryptjs')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Record = require('../record')
const User = require('../user')
const recordData = require('./recordSample.json')

const db = require('../../config/mongoose')

const SEED_USER = {
  name: 'test',
  email: 'test@example.com',
  password: '123456'
}

db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      return Promise.all(Array.from(
        { length: recordData.length },
        (_, i) => Record.create({
          name: recordData[i].name,
          category: recordData[i].category,
          date: recordData[i].date,
          amount: recordData[i].amount,
          merchant: recordData[i].merchant,
          userId
        })
      ))
    })
    .then(() => {
      console.log(recordData[1])
      console.log('done!')
      process.exit()
    })
})

