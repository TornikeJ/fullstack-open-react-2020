
import React from 'react'
import './Notification.css'

const Notification = (props) => {

  return(
    props.errorMessage?
      <div className="error">
        {props.errorMessage}
      </div>:
      props.successMessage?
        <div className="success">
          {props.successMessage}
        </div> :
        null
  )
}

export default Notification