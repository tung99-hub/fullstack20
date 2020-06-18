import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistic = (props) => {
  if (props.text === "positive") {
    return (
      <tr>
        <td>{props.text}</td>
        <td>{props.value} %</td>
      </tr>
    )
  }
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value} </td>
    </tr>
  )
}

const Statistics = (props) => {
  if (props.good + props.neutral + props.bad === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <table>
      <tbody>
        <Statistic text="good" value ={props.good} />
        <Statistic text="neutral" value ={props.neutral} />
        <Statistic text="bad" value ={props.bad} />
        <Statistic text="all" value ={props.good + props.neutral + props.bad} />
        <Statistic text="average" value ={((props.good - props.bad) / (props.good + props.neutral + props.bad)).toFixed(2)} />
        <Statistic text="positive" value ={((props.good *100) / (props.good + props.neutral + props.bad)).toFixed(2)} />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addFeedback = (type) => {
    const handler = () => {
      if (type === "good") {
        setGood(good + 1)
      } else if (type === "neutral") {
        setNeutral(neutral + 1)
      } else {
        setBad(bad + 1)
      }      
    }
    return handler
  }

  // returns necessary properties for the Statistics board
  const getGood = () => (good)
  const getNeutral = () => (neutral)
  const getBad = () => (bad)
  
  return (    
    <div>
      <h1>
        give feedback
      </h1>
      
      <Button handleClick={addFeedback("good")} text="good" />
      <Button handleClick={addFeedback("neutral")} text="neutral" />
      <Button handleClick={addFeedback("bad")} text="bad" />

      <h1>
        statistics
      </h1>

      <Statistics good={getGood()} neutral={getNeutral()} bad={getBad()} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)