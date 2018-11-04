import axios from 'axios';

const url = 'api/letters/incoming-letter';

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
};
