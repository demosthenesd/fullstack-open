
const PersonForm = ({ handleFormSubmit, handleInputChange, handleNumberChange, newName, newNumber }) => {

    return (

        <form onSubmit={handleFormSubmit}>
            <div>
                name: <input value={newName} onChange={handleInputChange} />
            </div>
            <div>
                <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )

}

export default PersonForm