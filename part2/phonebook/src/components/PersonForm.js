import React from 'react'

const PersonForm = (props) => {
    return(
        <form onSubmit={props.handleSubmit}>
        <div>
            name: <input value={props.nameValue} onChange={props.handleNameUpdate} required/>
        </div>
        <div>
            number: <input value={props.numberValue} onChange={props.handlePhoneUpdate} required/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm;