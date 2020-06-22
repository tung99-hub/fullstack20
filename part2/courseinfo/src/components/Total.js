import React from 'react'

const Total = ({course}) => {
  const total = course.parts.map((part) => part.exercises)  
  return (
    <div>
      <b>
      total of {total.reduce((a,b) => a+b, 0)} exercises
      </b>
    </div>
  )
}

export default Total