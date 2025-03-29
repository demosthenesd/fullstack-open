const App = () => {
  const course = "Half Stack application development";

  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];

  const Header = (props) => {
    return (
      <div>
        <p>{props.course}</p>
      </div>
    );
  };

  const Content = (props) => {
    console.log("props in content: ,", props);

    const parts = props.parts.map((value) => {
      return (
        <li>
          {value.name}: {value.exercises}
        </li>
      );
    });

    return (
      <div>
        <ul>{parts} </ul>
      </div>
    );
  };

  const Part = (props) => {
    return (
      <div>
        <p>
          {props.part.name}: {props.part.exercises}
        </p>
      </div>
    );
  };

  const Total = (props) => {

    let tot = 0;
    props.parts.forEach(element => {
      tot += element.exercises;
      
    });

    return (
      <div>
        <p>Total is: {tot}</p>
      </div>
    );
  };

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

export default App;
