import axios from 'axios';

const url = 'api/letter-codes';

export default {
  getList (id) {
    return axios.get(url + '/' + id + '/sub-letter-codes', {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('__token__'),
      },
    });
  },
};