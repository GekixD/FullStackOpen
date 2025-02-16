import { useState } from "react";

const StatisticsLine = ({text, value}) => <p>{text} {value}</p>;

const StatisticsLineTable = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
};

const StatisticsTable = ({good, neutral, bad, givenFeedback}) => {

  if(!givenFeedback) {
    return <p>No feedback given</p>
  }

  const all = good + neutral + bad;
  const average = (good - bad) / all;
  const positive = `${100 * good / all}%`;

  return (
    <table>
      <tbody>
        <StatisticsLineTable text='good' value={good} />
        <StatisticsLineTable text='neutral' value={neutral} />
        <StatisticsLineTable text='bad' value={bad} />
        <StatisticsLineTable text='all' value={all} />
        <StatisticsLineTable text='average' value={average} />
        <StatisticsLineTable text='positive' value={positive} />
      </tbody>
    </table>
  )
};

const Statistics = ({good, neutral, bad, givenFeedback}) => {

  if(!givenFeedback) {
    return <p>No feedback given</p>
  }

  const all = good + neutral + bad;
  const average = (good - bad) / all;
  const positive = `${100 * good / all}%`;

  return (
    <>
      <StatisticsLine text='good' value={good} />
      <StatisticsLine text='neutral' value={neutral} />
      <StatisticsLine text='bad' value={bad} />
      <StatisticsLine text='all' value={all} />
      <StatisticsLine text='average' value={average} />
      <StatisticsLine text='positive' value={positive} />
    </>
  )
};

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>;

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [givenFeedback, setGivenFeedback] = useState(false);

  const handleFeedback = (type) => {
    switch(type) {
      case 'good':
        setGood(good + 1)
        break;
      case 'neutral':
        setNeutral(neutral + 1)
        break;
      case 'bad':
        setBad(bad + 1)
        break;
    };
    setGivenFeedback(true);
  };

  return (
    <>
      <h1>give feedback</h1>
      <Button onClick={() => handleFeedback('good')} text='good' />
      <Button onClick={() => handleFeedback('neutral')} text='neutral' />
      <Button onClick={() => handleFeedback('bad')} text='bad' />
      <h1>statistics</h1>
      <StatisticsTable good={good} neutral={neutral} bad={bad} givenFeedback={givenFeedback}/>
    </>
  )
};

export default App