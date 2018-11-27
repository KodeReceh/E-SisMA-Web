import axios from 'axios';

const url = 'api/files';
const token = localStorage.getItem('__token___');
const headers = {
  headers: {
    Authorization: 'bearer ' + token,
  },
};

export default {
  getList () {
    return axios.get(url, headers);
  },
  get (id) {
    return axios.get(`${url}/${id}`, headers);
  },
  store (data) {
    return axios.post(url, data, headers);
  },
  delete (id) {
    return axios.delete(`${url}/${id}`, headers);
  },
  update (id, data) {
    return axios.put(`${url}/${id}`, data, headers);
  },
  getByDocument (document) {
    return axios.get(`api/documents/${document}/files`, headers);
  }
};