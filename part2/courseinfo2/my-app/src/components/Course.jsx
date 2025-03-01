const Header = (props) => {
  return (
    <h2>{props.course}</h2>
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
          <Part key={item.id} name={item.name} exercises={item.exercises} />
        ))
      }
    </>
  )
}

const Total = (props) => {
  const  {parts} = props
  const total = parts.reduce((prev, curr) => prev + curr.exercises, 0)
  return (
    <strong>Total of {total} exercises</strong>
  )
}

const Course = ({course}) => {
    return(
        <>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </>
    );
}

export default Course;