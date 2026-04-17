const Header=(props)=>{
return(
<div>
	<p>{props.course}</p>
</div>
)
}

const Part=(props)=>{
return(	
<p>{props.part.name}{props.part.exercises}</p>
);
}


const Content = (props) => {
  
  return (
    <div>
      <Part part={props.parts[0]} />
      <Part part={props.parts[1]} />
      <Part part={props.parts[2]} />
    </div>
  );
};


const Total = (props) => {
  const sum = props.parts.reduce((acc, part) => acc + part.exercises, 0);
  return (
    <div>
      <p>Total exercises: {sum}</p>
    </div>
  );
};


const App=()=>{

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

return(
<div>
	<Header course={course.name} />
	<Content parts={course.parts}/>
	<Total parts={course.parts}/>
</div>
)
}	
 

export default App
