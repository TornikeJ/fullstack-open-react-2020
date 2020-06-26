import React from "react";
import ReactDOM from "react-dom";
import Header from './components/Header'
import Content from './components/Content'
import Total from './components/Total'
import { CoursePart } from './shared/courseParts';


const App: React.FC = () => {
  const courseName = "Half Stack application development";
  
  // this is the new coursePart variable
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: "Super Duper",
      description:'React is Love',
      exerciseCount: 7,
      groupProjectCount: 5
    },
  ];
  

  return (
    <div>
      <Header name={courseName}></Header>
      <Content courseParts={courseParts}></Content>
      <Total courseParts={courseParts}></Total>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));