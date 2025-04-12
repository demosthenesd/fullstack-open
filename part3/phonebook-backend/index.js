const express = require('express')

const app = express();

app.use(express.json())


const persons = [
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




const PORT = 3001;
app.listen(PORT, () => console.log("listening to port: ", PORT))