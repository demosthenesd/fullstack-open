import { useState } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = (props) => {
  const [persons, setPersons] = useState(props.persons);

  const [filteredPersons, setFilteredPersons] = useState(persons);


  const [newName, setNewName] = useState('jawma')
  const [newNumber, setNewNumber] = useState('0421 021 393')
  const [newFilter, setNewFilter] = useState('')


  const handleInputChange = (e) => setNewName(e.target.value);
  const handleNumberChange = (e) => setNewNumber(e.target.value);
  const handleFilterChange = (e) => {
    setNewFilter(e.target.value);
    const filtered = persons.filter(person => person.name.toLowerCase().includes(e.target.value.toLowerCase()));
    setFilteredPersons(filtered);

  }
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber
    }
    const personExist = persons.some(person => person.name === newName);
    if (personExist) { return alert(`${newName} is already added to the phonebook`); }
    setPersons(persons.concat(personObject))
    setFilteredPersons(persons.concat(personObject));
    setNewName('');
    setNewNumber('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilter} onChange={handleFilterChange} />
      <h3>add new</h3>
      <PersonForm handleFormSubmit={handleFormSubmit}
        handleInputChange={handleInputChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h3>Numbers</h3>
      <Persons filteredPersons={filteredPersons} />
    </div>
  )
}

export default App