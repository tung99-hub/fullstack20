import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

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
          <button onClick={toggleVisibility}>{props.reverseLabel}</button>
        </div> :
        <div>
          {props.alt}
          <button onClick={toggleVisibility}>{props.buttonLabel}</button>
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