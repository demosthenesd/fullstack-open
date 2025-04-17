const mongoose = require('mongoose')

const password = process.argv[2]

const url = `mongodb+srv://demosthenesdemecillo:${password}@cluster0.tap7yqm.mongodb.net/phoneBookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Phonebook = mongoose.model('Phonebook', phonebookSchema)

if (process.argv.length < 4) {

  Phonebook.find({}).then(result => {
    console.log("phonebook:")
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
    process.exit(1)
  })
}
else {


  const argName = process.argv[3]
  const argNumber = process.argv[4]

  const person = new Phonebook({
    name: argName,
    number: argNumber,
  })

  person.save().then(result => {
    console.log(`added ${argName} with Number: ${argNumber} to Phonebook`)
    mongoose.connection.close()
  })
}