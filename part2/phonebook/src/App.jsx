import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('jawma')


  const handleInputChange = (e) => setNewName(e.target.value);



  const handleFormSubmit = (e) => {
    e.preventDefault();
    const personObject = {
      name: newName
    }

    const personExist = persons.some(person => person.name === newName);
    !personExist ? setPersons(persons.concat(personObject)) : alert(`${newName} is already added to the phonebook`);

    setNewName('');
  }



  return (
    <div>
      <h2>Phonebook</h2>
      <div><ul>
        {persons.map(person => <li key={person.name + persons.length}>{person.name}</li>)}
      </ul>
      </div>
      <form onSubmit={handleFormSubmit}>
        <div>
          name: <input value={newName} onChange={handleInputChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      ...
    </div>
  )
}

export default App