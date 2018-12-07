import axios from 'axios';

const url = process.env.API_URL + '/letter-codes';

export default {
  getList () {
    return axios.get(url, {
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
  }
};