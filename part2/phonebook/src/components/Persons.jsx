import personService from '../services/persons'


const Persons = ({ filteredPersons, deletePerson }) => {


    return (
        <div><ul>
            {filteredPersons.map(person =>
                <li key={person.name + person.id}>{person.name} {person.number}
                    <button onClick={() => deletePerson(person.id)}>delete</button>
                </li>)}
        </ul>
        </div>
    )
}


export default Persons