import axios from 'axios';

const url = process.env.API_URL + '/outcoming-letter-drafts';

export default {
  getList () {
    return axios.get(`${url}`, {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('__token__'),
      }
    });
  },
  download (id) {
    return axios.get(`${url}/${id}/download`, {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('__token__'),
      }
    });
  }
};