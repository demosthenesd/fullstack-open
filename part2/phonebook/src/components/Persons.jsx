const Persons = ({ filteredPersons }) => {

    return (

        <div><ul>
            {filteredPersons.map(person => <li key={person.name + person.id}>{person.name} {person.number}</li>)}
        </ul>
        </div>
    )
}


export default Persons