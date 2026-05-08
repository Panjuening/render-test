require('dotenv').config()
const express = require('express')
const Person = require('./models/person')
const morgan = require('morgan')
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

app.get('/api/info', (request, response, next) => {
  Person.countDocuments({})
    .then(count => {
      response.send(`<h1>Phone Book has info for ${count} people</h1>\n<p>${request.startTime}</p>`)
    })
    .catch(error => next(error))
})

app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then(persons => {
      response.json(persons)
    })
    .catch(error => next(error))
})



app.get('/api/persons/:id', (request, response,next) => {
  Person.findById(request.params.id).then(person => {
    if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
  }).catch(error => next(error))
})


app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})


function getRandomInt(min,max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // 不包含最大值，包含最小值
}

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findById(request.params.id)
    .then(person => {
      if (!person) {
        return response.status(404).end()
      }

      person.name = name
      person.number = number

      return person.save().then((updatedNote) => {
        response.json(updatedNote)
      })
    })
    .catch(error => next(error))
})

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

     return person.save().then(savedPerson => {
        response.json(savedPerson)
      })
    .catch(error => next(error))

})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 
  next(error)
}


app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
