import { useState, useEffect } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

import personService from './services/persons'

const App = (props) => {
  const [persons, setPersons] = useState([]);

  const [filteredPersons, setFilteredPersons] = useState([]);


  const [newName, setNewName] = useState('jawma')
  const [newNumber, setNewNumber] = useState('0421 021 393')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(person => {
        setPersons(person)
        setFilteredPersons(person)
      })
  }, [])



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


    personService.create(personObject).then(res => {
      setPersons(persons.concat(res))
      setFilteredPersons(persons.concat(res));
      setNewName('');
      setNewNumber('');
    })
  }


  const deletePerson = (id) => {
    const deleteThis = filteredPersons.find(person => person.id === id);
    if (!deleteThis) return;

    personService.deletePerson(deleteThis.id).then(res => {

      const updatedPersons = filteredPersons.filter(person => person.id !== res.id);

      if (window.confirm("ARE YOU SURE YOU WANT TO DELETE?")) setFilteredPersons(updatedPersons);
    }
    );
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
      <Persons filteredPersons={filteredPersons} deletePerson={deletePerson} />
    </div>
  )
}

export default App