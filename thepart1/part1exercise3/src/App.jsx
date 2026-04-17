import { useState } from 'react'

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

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

  const next=()=>
  {
    setSelected(getRandomInt(8))
  }

  let max=0
  const votes = [0, 0, 0, 0, 0, 0, 0, 0]
  
  const votesave=()=>
  {
    votes[selected]+=1
    let maxValue = Math.max(...votes);
    max = votes.indexOf(maxValue); 
    console.log("当前最大票数：",maxValue );
    console.log("投票数组：", votes);
    document.getElementById('ancdote').textContent = `${anecdotes[max]}`;
    document.getElementById('voteCount1').textContent = `have ${votes[selected]} votes`;
    document.getElementById('voteCount2').textContent = `have ${votes[max]} votes`;
  }

  return (
    <div>
      <h1> 
        {anecdotes[selected]}
      </h1>
      <p id="voteCount1">
        have {votes[selected]} votes
      </p>

      <button onClick={votesave}>
        vote
      </button>
      <button onClick={next}>
        next anecdote
      </button>

      <h1>Anecdotes with most votes</h1>
      <h1 id="ancdote">
        {anecdotes[max]}
      </h1>
      <p id="voteCount2">
        have {votes[max]} votes
      </p>
    </div>
  )
}
export default App
