import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/'

const login = async credentials => {
  const response = await axios.post(baseUrl+'login', credentials)
  return response.data
}

const getAll = async () => {
  const response = await axios.get(baseUrl+'users')
  console.log(response.data)
  return response.data
}

export default { login, getAll }