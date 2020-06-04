import React from 'react'

const Filter = (props) => {
    return(
        <div>
            find countries: <input value={props.value} onChange={props.handleChange} />
        </div>
    )
}

export default Filter;