const { json } = require('express')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

app = express()

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.use(morgan('tiny'))



persons = [
  {
    id: 1,
    name: "Alto Herras",
    number: "303-124-3242"
  },
  {
    id: 2,
    name: "James Lipe",
    number: "324-21-3242"
  },
  {
    id: 3,
    name: "Ralph :)",
    number: "2432-234-12321"
  },
  {
    id: 4,
    name: "NICOLE",
    number: "242-131-423423"
  },
]

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) => {
  const numPersons = persons.length
  const date = new Date()
  response.send(`<h1>There are ${numPersons} entries</h1><p>${date}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
  const id = +request.params.id
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.put('/api/persons/:id', (request, response) => {
  const id = +request.params.id
  const otherPersons = persons.filter(person => person.id !== id)
  const body = request.body

  persons = otherPersons.concat(body)
  response.json(body)
  
})

app.delete('/api/persons/:id', (request, response) => {
  const id = +request.params.id
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const newId = Math.floor(Math.random() * 10000)
  const body = request.body

  if (!body.name) {
    return response.status(400).json({
      error: 'name must be provided'
    })
  }
  if (!body.number) {
    return response.status(400).json({
      error: 'number must be provided'
    })
  }
  if (persons.find(person => person.name == body.name)){
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const person = {
    id: newId,
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person)

  response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})