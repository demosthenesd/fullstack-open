const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 100
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  const Header = (props) => {
    return (
      <div>
        <p>{props.course.name}</p>
      </div>
    );
  };

  const Content = (props) => {
    console.log("props in content: ,", props);

    const parts = props.course.parts.map((value) => {
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
    props.course.parts.forEach(element => {
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
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

export default App;
