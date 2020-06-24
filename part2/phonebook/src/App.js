import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
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
    else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNum('')
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
      <Persons persons={persons} search={newSearch} />
    </div>
  )
}

export default App