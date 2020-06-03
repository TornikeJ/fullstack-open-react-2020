import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <>
      <h1>{props.title}</h1>
    </>
  )
}

const Statistics = (props) => {
  return (
    <>
      <h1>{props.result.title}</h1>
      <p>good {props.result.good}</p>
      <p>neutral {props.result.neutral}</p>
      <p>bad {props.result.bad}</p>
      <p>all {props.result.all}</p>
      <p>average {props.result.average}</p>
      <p>positive {props.result.positive} %</p>
    </>
  )
}


const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const sum=()=>{
    return good+neutral+bad;
  }

  const average=()=>{
    return (good*1+neutral*0+bad*-1)/sum();
  }
  
  const positive=()=>{
    return good*100/sum();
  }

  const feedback={
    title:"give feedback",
    result:{
      title:"statistics",
      good,
      neutral,
      bad,
      all:sum(),
      average:average() || 0,
      positive:positive() || 0
    }
  }  

  return (
    <div>
      <Header title={feedback.title} />
      <button onClick={()=>setGood(good+1)}>good</button>
      <button onClick={()=>setNeutral(neutral+1)}>neutral</button>
      <button onClick={()=>setBad(bad+1)}>bad</button>
      <Statistics result={feedback.result} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)