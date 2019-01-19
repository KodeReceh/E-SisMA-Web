import axios from "axios";

const url = "villagers";

export default {
  all() {
    return axios.get(url, {
      headers: {
        Authorization: "bearer " + localStorage.getItem("__token__")
      }
    });
  },
  getFields() {
    return axios.get(`${url}/fields`, {
      headers: {
        Authorization: "bearer " + localStorage.getItem("__token__")
      }
    });
  },
  get(id) {
    return axios.get(`${url}/${id}`, {
      headers: {
        Authorization: "bearer " + localStorage.getItem("__token__")
      }
    });
  },
  store(data) {
    return axios.post(url, data, {
      headers: {
        Authorization: "bearer " + localStorage.getItem("__token__")
      }
    });
  },
  update(id, data) {
    return axios.put(`${url}/${id}`, data, {
      headers: {
        Authorization: "bearer " + localStorage.getItem("__token__")
      }
    });
  },
  delete(id) {
    return axios.delete(`${url}/${id}`, {
      headers: {
        Authorization: "bearer " + localStorage.getItem("__token__")
      }
    });
  },
  getPic(filename) {
    return axios.get(`${url}/get-pic/${filename}`, {
      responseType: "blob",
      headers: {
        Authorization: "bearer " + localStorage.getItem("__token__")
      }
    });
  }
};
