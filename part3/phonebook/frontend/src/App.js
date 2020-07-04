import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import personService from './services/persons'
import './index.css'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')
  const [ message, setMessage ] = useState(null) 

  useEffect(() => {
    personService
      .getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
        })
  }, [])
  
  const addPerson = (event) => {
    event.preventDefault()
    const name = newName
    const number = newNum
    setNewName('')
    setNewNum('')
    const personObject = {
      name: name,
      number: number
    }
    if (persons.some(person => person.name === name && person.number === number)) {
      window.alert(`${name} ${number} is already added to phonebook`)
    } 
    else if (persons.some(person => person.name === name)) {
      const result = window.confirm(`${name} is already added to phonebook, replace with a new one?`)
      if (result) {
        const p = persons.find(p => p.name === name)        
        personService
        .update(p.id, personObject)
          .then((returnedPerson) => {
            setPersons(persons.map(person => person.id !== p.id ? person : returnedPerson))
            setMessage(`Updated ${name}`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch(error =>
            setMessage(`${error.response.data.error}`))
            setTimeout(() => {
              setMessage(null)
            }, 5000)
      }
    }  
    else {
      personService
      .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setMessage(`Added ${personObject.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
      })
        .catch(error => {
          setMessage(`${error.response.data.error}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
  }

  const deletePerson = (person) => {
    const result = window.confirm(`Delete ${person.name}?`)
    if (result) {
      personService
      .remove(person.id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id))
          setMessage(`Removed ${person.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumChange = (event) => {
    setNewNum(event.target.value)
  }

  const handleSearch = (event) => {
    setNewSearch(event.target.value)
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter search={newSearch} handleSearch={handleSearch}/>
      <h3>add a new entry</h3>
      <PersonForm addPerson={addPerson} handleName={handleNameChange} handleNum={handleNumChange} name={newName} num={newNum} setMessage={setMessage} />
      <h3>Numbers</h3>
      <Persons persons={persons} search={newSearch} deletePerson={deletePerson} />
    </div>
  )
}

export default App