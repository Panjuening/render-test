import { useState } from 'react'

const Statistics = ({ data,showStats}) => {
if (!showStats) {
    return <p>No feedback given</p>;
  }
return(

<div>
  <table border="2" cellPadding="8" cellSpacing="0">
	  {Object.entries(data).map(([key, value]) => (
        <tr>
          <td>
        <p key={key}>
         {key}</p>
          </td>
          <td>
         <p>{value}</p>
         </td>
        </tr>
      ))}
  </table>
</div>

)
};

const Button = ({onClick,text}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average,setAverage]=useState(0)
  const [positive,setPositive]=useState(0)
  const stateObj ={ good,neutral,bad,all,average,positive }
  


const handlgoodClick = () => {
		const update = good + 1
		const totall=update+neutral+bad
		setGood(update)
		setAll(totall)
		setAverage((totall)/3)
		setPositive(((update/totall)*100).toFixed(2))
	}
  const handneutralClick=()=>{
		const update = neutral + 1
		const totall=good+update+bad
		setNeutral(update)
		setAll(totall)
		setAverage((totall)/3)
		setPositive(((good/totall)*100).toFixed(2))
  }
  const handbadClick=()=>{
		const update =bad + 1
		const totall=good+neutral+update
		setBad(update)
		setAll(totall)
		setAverage((totall)/3)
		setPositive(((good/totall)*100).toFixed(2))
  }
  
  const showStats=average;




  return (

    <div>
	<h1>give feedback</h1>
	<Button onClick={handlgoodClick} text={"good"}/>
  <Button onClick={handneutralClick} text={"neutral"}/>
	<Button onClick={handbadClick} text={"bad"}/>

	<h1>statistics</h1>
	<Statistics data={stateObj} showStats={showStats}/>
    </div>
  )
}


export default App
