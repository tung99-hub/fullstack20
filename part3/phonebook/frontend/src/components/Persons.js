import React from 'react'

const Persons = (props) => {
  return (
    <ul>
    {props.persons.filter(person => person.name.toLowerCase().includes(props.search.toLowerCase())).map((person) => 
      <p key={person.id}>
        {person.name} {person.number}
        <button onClick={() => props.deletePerson(person)}>delete</button>
      </p>
    )}
  </ul>    
  )
}

export default Persons