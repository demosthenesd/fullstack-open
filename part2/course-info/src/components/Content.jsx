import Part from "./Part";

import Total from "./Total";


const Content = ({ parts }) => {

    const total = parts.reduce((prev,part)=> prev + part.exercises,0);

    return (
        <>
            {parts.map(part => <Part key={part.id} part={part} />)}
            <Total total ={total}/>
        </>
    )
}


export default Content