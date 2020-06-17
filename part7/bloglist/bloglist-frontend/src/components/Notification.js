import React from 'react'
import { useSelector } from 'react-redux'
import './Notification.css'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  console.log(notification,'lalala')
  return (
    notification?
    <div className={notification.result}>
      {notification.message}
    </div>
    :
    null
  )
}

export default Notification