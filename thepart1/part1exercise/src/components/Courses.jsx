const Total = (props) => {
  const sum = props.parts.reduce((acc, part) => acc + part.exercises, 0);
  return (
    <div>
      <p>Total exercises: {sum}</p>
    </div>
  );
};


const Header = (props) => {
  return <h1>{props.name}</h1>;
};

const Content=(props)=>{
 return(<ul>
    {props.parts.map(part => (
    <li key={part.id}>
    {part.name} {part.exercises}
    </li>
    ))}
  </ul>);
};

const Courses = (props) => {
  return(<div>
  <Header name={props.courses.name} />
  <Content parts={props.courses.parts}/>
  <Total parts={props.courses.parts}/>
  </div>
  )
};

export default Courses
