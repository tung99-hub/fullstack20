import React from 'react'

const Filter = (props) => {
  return (
    <form>
      <div>filter shown with <input value={props.search} onChange={props.handleSearch}/></div>      
    </form>
  )
}

export default Filter