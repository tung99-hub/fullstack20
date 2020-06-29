import React from 'react'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    // The color of the Notification bar should be changed according to whether it is a 
    // success/error message, but it is not possible for me right now.
    <div className="notification">
      {message}
    </div>
  )
}

export default Notification