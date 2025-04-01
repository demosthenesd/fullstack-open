import { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>


const StatisticLine = ({ text, value }) => (
  <tr>
    <td>
      {text}
    </td>
    <td>
      {value}
    </td>
  </tr>
)

const Statistics = ({ good, bad, neutral }) => {
  if (good + bad + neutral === 0) return (
    <div>
      <h2>Statistics</h2>
      <p>

        No feedback given
      </p>
    </div>)

  const all = (good + bad + neutral);
  const avg = ((good * 1) + (bad * -1) + (neutral * 0)) / all || 0;
  const positive = ((good * 1) / all) * 100 || 0;

  return (
    <div>
      <h2>Statistics</h2>
      <table>


        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="avg" value={avg} />
        <StatisticLine text="positive" value={positive + "%"} />

      </table>
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
      <Button onClick={handleGoodClick} text={"good"} />
      <Button onClick={() => setNeutral(neutral + 1)} text={"neutral"} />
      <Button onClick={handleBadClick} text={"bad"} />

      <Statistics good={good} bad={bad} neutral={neutral} />

    </div>
  )
}

export default App