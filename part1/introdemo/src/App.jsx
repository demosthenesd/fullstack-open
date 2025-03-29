const Hello = (props) => {
  return (
    <div>
      <p>
        Hello world ka {props.name} nga tigols with the age of {props.age}
      </p>
    </div>
  );
};

const Footer = () => {
  return <footer>Thiss a footer babyy</footer>;
};

const App = () => {
  const name = "Peter";
  const age = 10;

  return (
    <>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />
      <Hello name={name} age={age} />
      <Footer />
    </>
  );
};

export default App;
