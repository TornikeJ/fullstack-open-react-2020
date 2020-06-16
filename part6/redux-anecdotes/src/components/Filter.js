import React from 'react'
import { useDispatch } from 'react-redux'
import { filterAction } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = (props) => {
  // const dispatch = useDispatch();

  const style = {
    marginBottom: 10
  }


  const handleChange = (event) => {
    props.filterAction(event.target.value)
  }

  return (
    <div style={style}>
        Filter <input onChange={handleChange} />
    </div>
  ) 
}


const mapDispatchToProps = {
  filterAction
}

const ConnectedNotes = connect(null,mapDispatchToProps)(Filter)
export default ConnectedNotes
// export default Filter