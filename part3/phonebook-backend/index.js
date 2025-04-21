require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express();
const morgan = require('morgan')
const Person = require('./models/person');

morgan.token('body', req => {
    return JSON.stringify(req.body)
})
app.use(express.json())
app.use(morgan(':method :url :status  :response-time ms   :body'))
app.use(cors());
app.use(express.static('dist'))


const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
  
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    }
  
    next(error)
  }


morgan.token('type', function (req, res) { return req.headers['content-type'] })

app.get("/api/persons", (req, res) => {
    Person.find({}).then(person => {
        res.json(person)
    })
})


app.get("/api/info", async (req, res) => {

    const now = new Date();
    console.log(Person.find({}).then(person => { console.log(person.length) }));
    const numOfPersons = await Person.find({}).then(person => { return person.length })
    const htmlRes = `<p> Phonebook has info for ${numOfPersons} people</p>
                            <p>${now.toString()}
            `
    res.send(htmlRes)
})

app.get("/api/persons/:id", (req, res, next) => {

    Person.findById(req.params.id).then(person => {
        res.json(person)
    }).catch(error => next(error))

})

app.delete("/api/persons/:id", (req, res, next) => {
    Person.deleteOne({ _id: req.params.id }).then(output =>
        res.json(output)).catch(error => next(error))
})

app.post("/api/persons", (req, res,next) => {
    const newGuy = req.body;

    if (!newGuy.name || !newGuy.number) {
        return res.status(400).json({ error: "Missing name or number" });
    }

    const newPerson = new Person({
        name: newGuy.name,
        number: newGuy.number
    });

    newPerson.save()
        .then(savedPerson => {
            res.json(savedPerson);
        })
        .catch(error => {
            next(error)
        });
});

app.put('/api/persons/:id', (request, response, next) => {
    const { name, number } = request.body

    Person.findById(request.params.id)
        .then(person => {
            if (!person) {
                return response.status(404).end()
            }


            person.name = name
            person.number = number

            return person.save().then((updatedPerson) => {
                response.json(updatedPerson)
            })
        })
        .catch(error => next(error))
})
app.use(errorHandler)
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log("listening to port: ", PORT))
