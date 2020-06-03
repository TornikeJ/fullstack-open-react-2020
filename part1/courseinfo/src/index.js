import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Header = (props) =>{
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Part = (props) =>{
  return (
    <>
      <p>{props.part} {props.number}</p>
    </>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.part1} number={props.number1} />
      <Part part={props.part2} number={props.number2} />
      <Part part={props.part3} number={props.number3} />
    </div>
  )
}

const Total = (props) =>{
  return (
    <>
      <p>Number of exercises {props.total}</p>
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content 
        part1={part1.name} number1={part1.exercises}
        part2={part2.name} number2={part2.exercises}
        part3={part3.name} number3={part3.exercises}
      />
      <Total total={part1.exercises+part2.exercises+part3.exercises} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
