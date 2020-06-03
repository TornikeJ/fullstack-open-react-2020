import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <>
      <h1>{props.title}</h1>
    </>
  )
}

const Result = (props) => {
  return (
    <>
      <h1>{props.result.title}</h1>
      <p>good {props.result.good}</p>
      <p>neutral {props.result.neutral}</p>
      <p>bad {props.result.bad}</p>
    </>
  )
}


const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const feedback={
    title:"give feedback",
    result:{
      title:"statistics",
      good,
      neutral,
      bad
    }
  }  

  return (
    <div>
      <Header title={feedback.title} />
      <button onClick={()=>setGood(good+1)}>good</button>
      <button onClick={()=>setNeutral(neutral+1)}>neutral</button>
      <button onClick={()=>setBad(bad+1)}>bad</button>
      <Result result={feedback.result} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)