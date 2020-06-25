import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')

  useEffect(() => {
    personService
      .getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
        })
  }, [])
  
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNum
    }
    if (persons.some(person => person.name === newName && person.number === newNum)) {
      window.alert(`${newName} ${newNum} is already added to phonebook`)
    } 
    else if (persons.some(person => person.name === newName)) {
      const result = window.confirm(`${newName} is already added to phonebook, replace with a new one?`)
      if (result) {
        const p = persons.find(p => p.name === newName)        
        personService
        .update(p.id, personObject)
          .then((returnedPerson) => {
            setPersons(persons.map(person => person.id !== p.id ? person : returnedPerson))
          })
      }
    }  
    else {
      personService
      .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNum('')
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
      <Filter search={newSearch} handleSearch={handleSearch}/>
      <h3>add a new entry</h3>
      <PersonForm addPerson={addPerson} handleName={handleNameChange} handleNum={handleNumChange} name={newName} num={newNum}/>
      <h3>Numbers</h3>
      <Persons persons={persons} search={newSearch} deletePerson={deletePerson} />
    </div>
  )
}

export default App