import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons';
//const baseUrl = '/api/persons'; prodaction build

const getAll = () => {
    return axios.get(baseUrl)
  }

const create = newObject => {
    return axios.post(baseUrl, newObject)
  }

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
  }

const deleteUser = id => {
    return axios.delete(baseUrl+'/'+id)
}
  
export default { getAll, create, update, deleteUser }