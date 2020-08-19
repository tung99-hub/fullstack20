import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const noti = useSelector(state => state.noti)
  if (noti === null) {
    return null
  }

  return (
    <div className="notification">
      <Alert variant="success">
        {noti}
      </Alert>
    </div>
  )
}

export default Notification