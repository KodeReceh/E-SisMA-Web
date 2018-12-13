import axios from 'axios';

const url = process.env.API_URL + '/templates';

export default {
  get (template, id) {
    return axios.get(`${url}/${template}/letter_templates/${id}`, {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('__token__'),
      }
    });
  },
  getList (template) {
    return axios.get(`${url}/${template}/letter_templates`, {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('__token__'),
      }
    });
  },
  store (template, data) {
    return axios.post(`${url}/${template}/letter_templates`, data, {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('__token__'),
      }
    });
  },
  delete (template, id) {
    return axios.delete(`${url}/${template}/letter_templates/${id}`, {
      headers: {
        Authorization: 'bearer ' + localStorage.getItem('__token__'),
      }
    });
  }
};