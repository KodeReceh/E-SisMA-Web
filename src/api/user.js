import axios from 'axios';

const url = 'api/users';

export default {
  get (id) {
    return axios.get(`${url}/${id}`, {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('__token__'),
      },
    });
  }
};