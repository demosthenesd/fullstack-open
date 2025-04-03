
const Part = ({ part, id }) => {


    return (
        <>
            <ul>
                <li id={id}>{part.name}: {part.exercises}</li>
            </ul>
        </>
    )
}


export default Part