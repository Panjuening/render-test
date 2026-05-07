require('dotenv').config()
const express = require('express')
const Person = require('./models/person')
const morgan = require('morgan')
const { default: person } = require('./models/person')
const app = express()


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
  Note.findById(request.params.id).then(person => {
    response.json(person)
  })
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

  

app.post('/api/persons', (request, response,next) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing'
    })
  }

   Person.findOne({ name: body.name }).then(existingPerson => {
    if (existingPerson) {
      return response.status(400).json({ error: 'name must be unique' })
    }})

  const person = new Person({
      name: body.name,
      number: body.number,
    })

     person.save()
      .then(savedPerson => {
        // 保存成功后才发送响应
        response.json(savedPerson)
      })
      .catch(error => next(error)) // 错误传递给中间件
  
})


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
