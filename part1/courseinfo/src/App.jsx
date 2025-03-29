const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  const Header = (props) => {
    console.log(props);
    return (
      <div>
        <p>{props.course}</p>
      </div>
    );
  };  

  const Content = (props) => {
    return (
      <div>
        <p>
          {props.name}: {props.exercises}
        </p>
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
    return (
      <div>
        <p>Total is: {props.total}</p>
      </div>
    );
  };

  return (
    <div>
      <Header course={course} />
      <Part part={part1} />
      <Part part={part2} />
      <Part part={part3} />
      <Total total={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  );
};

export default App;
