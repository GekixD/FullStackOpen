import { useState } from 'react'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const SelectedQuote = ({quote, votes}) => {
  return (
    <>
      <p>{quote}</p>
      <p>has {votes} votes</p>
    </>
  )
}

const QuoteOfTheDay = ({anecdotes}) => {
  const votes = anecdotes.map(item => item.votes);
  const votesMax = votes.reduce((max, item) => (item > max)? item : max, -1);
  const bestQuote = anecdotes.filter(item => item.votes == votesMax)[0];

  return (
    <>
      <SelectedQuote quote={bestQuote.quote} votes={bestQuote.votes} />
    </>
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    { quote: 'If it hurts, do it more often.', votes: 0 },
    { quote: 'Adding manpower to a late software project makes it later!', votes: 0 },
    { quote: 'The first 90 percent of the code accounts for the first 90 percent of the development time... The remaining 10 percent of the code accounts for the other 90 percent of the development time.', votes: 0 },
    { quote: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', votes: 0 },
    { quote: 'Premature optimization is the root of all evil.', votes: 0 },
    { quote: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', votes: 0 },
    { quote: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.', votes: 0 },
    { quote: 'The only way to go fast, is to go well.', votes: 0 }
  ]);
   
  const [selected, setSelected] = useState(0);

  const handleNextSelected = (max) => {
    let randomQuote = Math.floor(Math.random() * max);
    while(randomQuote == selected) {
      randomQuote = Math.floor(Math.random() * max)
    };
    console.log(randomQuote, selected)
    console.log(anecdotes)
    setSelected(randomQuote)
  }

  const handleVote = () =>  {
    const copy = [...anecdotes]
    copy[selected].votes += 1
    setAnecdotes(copy)
    console.log(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <SelectedQuote quote={anecdotes[selected].quote} votes={anecdotes[selected].votes} />
      <Button onClick={() => handleVote()} text='vote' />
      <Button onClick={() => handleNextSelected(anecdotes.length)} text='next anecdote' />
      <h1>Anecdote with most votes</h1>
      <QuoteOfTheDay anecdotes={anecdotes}/>
    </div>
  )
}

export default App