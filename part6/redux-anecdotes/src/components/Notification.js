import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {props.noti}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    noti: state.notification
  }
}
export default connect(mapStateToProps)(Notification)