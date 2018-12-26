import axios from 'axios';

const url = 'villagers';

export default {
  all () {
    return axios.get(url, {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('__token__'),
      }
    });
  }
};