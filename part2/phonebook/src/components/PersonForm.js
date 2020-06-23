import React from 'react'

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <div>name: <input value={props.name} onChange={props.handleName}/></div>
      <div>number: <input value={props.num} onChange={props.handleNum}/></div>
      <div><button type="submit">add</button></div>
    </form>
  )
}

export default PersonForm