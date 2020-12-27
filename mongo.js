const mongoose = require('mongoose')


if (process.argv.length < 3) {
  console.log('invalid number of arguments')
  return
}

const password = process.argv[2]

const url =
  `mongodb+srv://james:${password}@cluster0.9y3xg.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  console.log('phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
  return
}

const name = process.argv[3]
const number = process.argv[4]

const newPerson = new Person({
  name: name,
  number: number
})

newPerson.save().then(result => {
  console.log('entry saved')
  mongoose.connection.close()
})