import axios from 'axios';

const url = process.env.API_URL + '/files';
let headers = {
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: 'bearer ' + localStorage.getItem('__token__'),
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
    return axios.get(`${process.env.API_URL}/documents/${document}/files`, headers);
  },
  getLastOrdinal (document) {
    return axios.get(`${process.env.API_URL}/documents/${document}/getLastOrdinal`, headers);
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