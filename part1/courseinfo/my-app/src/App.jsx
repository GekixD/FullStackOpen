const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  const {name, exercises} = props;
  return (
    <p>{name} {exercises}</p>
  )
}

const Content = (props) => {
  return (
    <>
      {
        props.parts.map(item => (
          <Part name={item.name} exercises={item.exercises} />
        ))
      }
    </>
  )
}

const Total = (props) => {
  const  {parts} = props
  const total = parts.reduce((prev, curr) => prev + curr.exercises, 0)
  return (
    <p>Number of exercises {total}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development', 
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <>
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    </>
  )
}

export default App
