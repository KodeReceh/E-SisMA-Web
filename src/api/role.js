import axios from 'axios';

const url = process.env.API_URL + '/roles';

export default {
  getList () {
    return axios.get(url, {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('__token__'),
      },
    });
  }
};