import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const [maxNum, setMaxNum] = useState(0);

  const randomNumber = Math.floor(Math.random() * anecdotes.length);

  const handleNextButtonClick = (randomNumber) => {
    console.log(randomNumber)
    setSelected(randomNumber)
  }

  const handleVoteClick = (selected) => {
    const copy = [...votes];
    copy[selected] += 1;

    setVotes(copy);
  }

  const Button = ({ onClick, text }) => <button onClick={onClick} >{text}</button>


  const AnecdoteOfTheDay = () => {

    console.log(Math.max(...votes));

    return (
      <>
        <p>{anecdotes[votes.indexOf(Math.max(...votes))]}</p>
        <p>
          has {Math.max(...votes)} votes
        </p>
      </>
    )


  }


  return (
    <div>

      <h1>Anecdote of the day</h1>
      <p>
        {anecdotes[selected]}
      </p>
      <p>
        has {votes[selected]} votes
      </p>
      <Button onClick={() => handleVoteClick(selected)} text="Vote" />
      <Button onClick={() => handleNextButtonClick(randomNumber)} text="Next anecdote" />
      <h1>Anecdote with the most votes</h1>
      <AnecdoteOfTheDay />


    </div>
  )
}

export default App