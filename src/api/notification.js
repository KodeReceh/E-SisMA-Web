import axios from 'axios';
const url = process.env.API_URL + '/users/notifications';

export default {
  getNotifications () {
    return axios.get(url, {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('__token__'),
      }
    });
  }
};