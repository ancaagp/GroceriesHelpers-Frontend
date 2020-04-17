import axios from 'axios';

const endpoint = 'http://localhost:4000/api/v1';

class UserAPI {
    static register = (user) => {
        return axios.post(`${endpoint}/register`, user)
          .then(res => res);
      }
      
    static login = (user) => {
        return axios.post(`${endpoint}/login`, user)
          .then(res => res);
      }

    static getUser = (id) => {
        return axios.get(`${endpoint}/users/${id}`)
    }

    static index = () => {
      return axios.get(`${endpoint}/users`)
    }

    static update = (user) => {
      return axios.put(`${endpoint}/users`, user);
    };
}


export default UserAPI;