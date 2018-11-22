import axios from 'axios';

const url = 'api/documents/1';
const authorization = 'bearer ' + localStorage.getItem('__token__');

export default {
  get (id) {
    return axios.get(`${url}/${id}`, {
      headers: {
        Authorization: authorization,
      },
    });
  },
  store (data) {
    return axios.post(url, data, {
      headers: {
        Authorization: authorization,
      },
    });
  },
  update (id, data) {
    return axios.put(`${url}/${id}`, data, {
      headers: {
        Authorization: authorization,
      },
    });
  },
  delete (id) {
    return axios.delete(`${url}/${id}`, {
      headers: {
        Authorization: authorization,
      },
    });
  },
  getAll () {
    return axios.get(url, {
      headers: {
        Authorization: authorization,
      },
    });
  },
};