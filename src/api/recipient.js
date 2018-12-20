import axios from 'axios';

const url = process.env.API_URL + '/recipients';

export default {
  get (letter_id, user_id) {
    return axios.get(`${url}/${letter_id}/user/${user_id}`, {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('__token__'),
      }
    });
  },
  getRecipients (letter_id) {
    return axios.get(`${url}/${letter_id}`, {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('__token__'),
      }
    });
  },
  getAvailableRecipients (letter_id) {
    return axios.get(`${url}/${letter_id}/user/available`, {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('__token__'),
      }
    });
  },
  addRecipient (letter_id, data) {
    return axios.post(`${url}/${letter_id}`, data, {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('__token__'),
      },
    });
  },
  delete (letter_id, user_id) {
    return axios.delete(`${url}/${letter_id}/user/${user_id}`, {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('__token__'),
      },
    });
  },
  getAllRecipients () {
    return axios.get(`${url}/user/all`, {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('__token__'),
      }
    });
  }
};