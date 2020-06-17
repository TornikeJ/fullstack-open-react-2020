import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
// import { composeWithDevTools } from 'redux-devtools-extension'
import blogsReducer from '../reducers/blogReducer'
import userReducer from '../reducers/userReducer'
import notificationReducer from '../reducers/notificationReducer'

const reducer = combineReducers({
  blogs: blogsReducer,
  user: userReducer,
  notification:notificationReducer
})

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default store
