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



app.get("/api/persons/:id", (req, res) => {

    Person.findById(req.params.id).then(person => {
        response.json(person)
    })
})


app.delete("/api/persons/:id",  (req, res) => {

    Person.deleteOne({ _id: req.params.id }).then(output =>
        res.json(output))
})


// const generateId = () => {
//     const maxId = Person.length > 0
//         ? Math.max(...Person.map(n => Number(n.id)))
//         : 0
//     return String(maxId + 1)
// }
app.post("/api/persons", (req, res) => {
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
            console.error("Error saving person:", error.message);
            res.status(500).json({ error: "Failed to save person" });
        });
});



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log("listening to port: ", PORT))
