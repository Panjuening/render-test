const express = require('express')
const morgan = require('morgan')
const app = express()

const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.xbheikr.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`


mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length===3){
console.log('phonebook:')
Person.find({}).then(result =>{
	result.forEach(person=>{
		console.log(`${person.name} ${person.number}`)
	})
	mongoose.connection.close()
})
}else if(process.argv.length === 5)
{
	const name =process.argv[3]
	const number=process.argv[4]

	const person =new Person({
	name:name,
	number:number,
	})

person.save().then(result => {
  console.log(`added ${result.name} number ${result.number} to phonebook`)
  mongoose.connection.close()
})
}else
{
  console.log('Usage: node mongo.js <password> [<name> <number>]')
  mongoose.connection.close()
}




let persons = [
    { 
      id: "1",
      name: "Arto Hellas", 
      number: "040-123456"
    },
    { 
      id: "2",
      name: "Ada Lovelace", 
      number: "39-44-5323523"
    },
    { 
      id: "3",
      name: "Dan Abramov", 
      number: "12-43-234345"
    },
    { 
      id: "4",
      name: "Mary Poppendieck", 
      number: "39-23-6423122"
    }
]

function toLocalDateTime(timestamp, keepSeconds = true) {
const date = new Date(Number(timestamp));    
if (isNaN(date.getTime())) return "无效时间";
let result = date.toLocaleString();
if (!keepSeconds) {    result = result.replace(/:\d{1,2}$/, "");  }  
return result;
}

app.use(express.static('dist'))
app.use(morgan('tiny'))
app.use(express.json())

app.use((request, response, next) => {
  const date = Date.now();
  request.startTime=toLocalDateTime(date)
  next()
})

app.get('/api/info', (request, response,next) => {
    const maxId =Math.max(...persons.map(n => Number(n.id)))
    response.send("<h1>Phone Book has info for "+maxId+" people</h1>\n"+"Set Jan "+ request.startTime)
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  pers
  ons = persons.filter(person => person.id !== id)

  response.status(204).end()
})


function getRandomInt(min,max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // 不包含最大值，包含最小值
}

  

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({
      error: 'name missing'
    })
  }

  if (!body.number) {
  return response.status(400).json({
    error: 'number missing'
  })
}

  const nameExists = persons.some(person => person.name === body.name);
  if(nameExists)
  {
    return response.status(400).json({ error: 'name must be unique'} )
  }
  

  const person = {
    name:body.name,
    number:body.number,
    id:getRandomInt(5,1000),
  }

app.get('/api/persons/', function (request, response) {
  response.send('hello, world!')
})

  persons = persons.concat(person)

  response.json(person)
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
