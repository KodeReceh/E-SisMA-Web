import axios from 'axios';

const url = process.env.API_URL + '/letter-codes';
const subUrl = 'sub-letter-codes';

export default {
  getList (id) {
    return axios.get(url + '/' + id + '/sub-letter-codes', {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('__token__'),
      },
    });
  },
  get (code, subCode) {
    return axios.get(`${url}/${subCode}`, {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('__token__'),
      },
    });
  },
};