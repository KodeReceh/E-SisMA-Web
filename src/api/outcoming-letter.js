import axios from 'axios';

const url = process.env.API_URL + '/letters/outcoming-letter';

export default {
  getList () {
    return axios.get(url, {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('__token__'),
      }
    });
  },
  store (data) {
    return axios.post(url, data, {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('__token__'),
      },
    });
  },
  update (id, data) {
    return axios.put(`${url}/${id}`, data, {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('__token__'),
      },
    });
  },
  get (id) {
    return axios.get(`${url}/${id}`, {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('__token__'),
      },
    });
  },
  delete (id) {
    return axios.delete(`${url}/${id}`, {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('__token__'),
      },
    });
  },
  getOrdinal (year) {
    return axios.get(`${url}/get-ordinal?year=${year}`, {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('__token__'),
      },
    });
  }
};
