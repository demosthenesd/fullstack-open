import { useState } from 'react'



const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>


const Statistics = ({ good, bad, neutral }) => {


  return (
    <div>
      <h2>Statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {good + bad + neutral}</p>
      <p>avg {((good*1) + (bad* -1) + (neutral*0)) /(good + bad + neutral)}</p>
    <p>positive {(((good*1) /(good + bad + neutral))*100)}%</p>
    
    </div>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const handleGoodClick = () => (setGood(prev => prev + 1))
  const handleBadClick = () => (setBad(prev => prev + 1))



  return (
    <div>
      <h1>give feedback
      </h1>
      <Button onClick={handleBadClick} text={"bad"} />
      <Button onClick={() => setNeutral(neutral + 1)} text={"neutral"} />
      <Button onClick={handleGoodClick} text={"good"} />

      <Statistics good={good} bad={bad} neutral={neutral} />

    </div>
  )
}

export default App