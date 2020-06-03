import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <>
      <h1>{props.title}</h1>
    </>
  )
}

const Statistic = (props) =>{
  return(
  <p>{props.text} {props.value} {props.text === 'positive' ? '%': ''}</p>
  )
}

const Statistics = (props) => {
  if(props.result.good === 0 && props.result.neutral === 0 && props.result.bad === 0 ){
    return (
      <>
      <h1>{props.result.title}</h1>
      <p>No feedback given</p>
      </>
    )
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>
              <h1>{props.result.title}</h1>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Statistic text="good" value={props.result.good}/>
            </td>
          </tr>
          <tr>
            <td>
              <Statistic text="neutral" value={props.result.neutral}/>
            </td>
          </tr>
          <tr>
            <td>
              <Statistic text="bad" value={props.result.bad}/>
            </td>
          </tr>
          <tr>
            <td>
              <Statistic text="all" value={props.result.all}/>
            </td>
          </tr>
          <tr>
            <td>
              <Statistic text="average" value={props.result.average}/> 
            </td>
          </tr>
          <tr>
            <td>
              <Statistic text="positive" value={props.result.positive}/>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.name}</button>
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
      <Button handleClick={()=>setGood(good+1)} name={'good'}/>
      <Button handleClick={()=>setNeutral(neutral+1)} name={'neutral'}/>
      <Button handleClick={()=>setBad(bad+1)} name={'bad'} />
      <Statistics result={feedback.result} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)