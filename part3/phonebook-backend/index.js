const express = require('express')
const cors = require('cors')
const app = express();
const morgan = require('morgan')


morgan.token('body', req => {
    return JSON.stringify(req.body)
  })    
app.use(express.json())
app.use(morgan(':method :url :status  :response-time ms   :body'))

app.use(cors());

morgan.token('type', function (req, res) { return req.headers['content-type'] })            

let persons = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]


app.get("/api/persons", (req, res) => {
    res.json(persons)
})


app.get("/api/info", (req, res) => {

    const now = new Date();

    const htmlRes = `<p> Phonebook has info for ${persons.length} people</p>
                    <p>${now.toString()}
    `
    res.send(htmlRes)
})



app.get("/api/persons/:id", (req, res) => {

    const personQuery = persons.find(person => person.id === req.params.id);
    personQuery ? res.json(personQuery) : res.status(404).end();
})


app.delete("/api/persons/:id", (req, res) => {
    persons = persons.filter(person => person.id !== req.params.id);
    res.json(persons).status(204).end()
})

 
const generateId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(n => Number(n.id)))
        : 0
    return String(maxId + 1)
}


app.post("/api/persons", (req, res) => {

    const newGuy = req.body;

    if (!newGuy.name || !newGuy.number) return res.status(400).json({ error: "Missing name or number" });

    if (persons.some((person) => person.name === newGuy.name)) return res.status(409).json({ error: "my guy, this guy already exist in the database" })


    const toAdd = {
        name: newGuy.name,
        number: newGuy.number,
        id: generateId()
    }

    persons = persons.concat(toAdd);

    res.json(toAdd);
})




const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log("listening to port: ", PORT))