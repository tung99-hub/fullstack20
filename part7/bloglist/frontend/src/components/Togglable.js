import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      {visible ?
        <div>
          {props.children}
          <Button variant='secondary' onClick={toggleVisibility}>
            {props.reverseLabel}
          </Button>
        </div> :
        <div>
          {props.alt}
          <Button variant='primary' onClick={toggleVisibility}>
            {props.buttonLabel}
          </Button>
        </div>}
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  reverseLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable