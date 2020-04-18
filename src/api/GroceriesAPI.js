import axios from 'axios';
const endpoint = `${process.env.REACT_APP_API_URL}/groceries`;

class GroceriesAPI {
  static index = () => {
    return axios.get(endpoint);
  }

  static create = (groceryList) => {
    return axios.post(endpoint, groceryList);
  }

  static delete = (groceryList) => {
    return axios.delete(`${endpoint}/${groceryList._id}`);
  }

  static update = (groceryList) => {
    return axios.put(`${endpoint}/${groceryList._id}`, groceryList);
  }

  static help = (groceryList) => {
    return axios.put(`${endpoint}/${groceryList._id}/help`, groceryList);
  }

  static complete = (groceryList) => {
    return axios.put(`${endpoint}/${groceryList._id}/complete`, groceryList);
  }

  static getMyGroceries = () => {
    return axios.get(`${endpoint}/mygroceries`);
  }

}

// const update = (doggo) => {
//     return axios.put(`${endpoint}/${doggo._id}`, doggo)
//       .then(res => res)
//       .catch(err => console.log(err));
//   }

//   const deleteDoggo = (id) => {
//     return axios.delete(`${endpoint}/${id}`)
//       .then(res => res)
//       .catch(err => console.log(err));
//   }

export default GroceriesAPI;
