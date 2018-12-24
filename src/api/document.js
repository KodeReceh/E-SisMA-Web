import axios from 'axios';

const url = process.env.API_URL + '/documents';

export default {
  get (id) {
    return axios.get(`${url}/${id}`, {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('__token__'),
      },
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
  delete (id) {
    return axios.delete(`${url}/${id}`, {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('__token__'),
      },
    });
  },
  getAll () {
    return axios.get(url, {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('__token__'),
      },
    });
  },
  download (data) {
    return axios.get(`${process.env.API_URL}/get-file/${data}`, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'bearer ' + localStorage.getItem('__token__'),
      },
      responseType: 'blob',
    });
  }
};