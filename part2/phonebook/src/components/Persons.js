import React from 'react'

const Persons = (props) => {
  return (
    <ul>
    {props.persons.filter(person => person.name.includes(props.search)).map((person) => 
      <p key={person.name}>{person.name} {person.number}</p>
    )}
  </ul>    
  )
}

export default Persons