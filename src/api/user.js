import axios from 'axios';

const url = process.env.API_URL + '/users';

export default {
  get (id) {
    return axios.get(`${url}/${id}`, {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('__token__'),
      },
    });
  },
  getUsersForSelectOption () {
    return axios.get(`${url}/select-options`, {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('__token__'),
      },
    });
  }
};