import axios from "axios";

const url = process.env.VUE_APP_API_URL + "/templates";

export default {
  get(id) {
    return axios.get(`${url}/${id}`, {
      headers: {
        Authorization: "bearer " + localStorage.getItem("__token__")
      }
    });
  },
  getList() {
    return axios.get(url, {
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
  getFieldResources(id) {
    return axios.get(`${url}/${id}/field-form`, {
      headers: {
        Authorization: "bearer " + localStorage.getItem("__token__")
      }
    });
  },
  storeFieldData(id, data) {
    return axios.post(`${url}/${id}/field-form`, data, {
      headers: {
        Authorization: "bearer " + localStorage.getItem("__token__")
      }
    });
  }
};
