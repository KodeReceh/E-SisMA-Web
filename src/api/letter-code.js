import axios from "axios";

const url = process.env.VUE_APP_API_URL + "/letter-codes";

export default {
  getList() {
    return axios.get(url, {
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
  getName(code, subCode) {
    let id = code;
    if (subCode) id = subCode;
    return axios.get(`${url}/${id}/get-name`, {
      headers: {
        Authorization: "bearer " + localStorage.getItem("__token__")
      }
    });
  },
  store(data) {
    return axios.post(`${url}`, data, {
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
  getSubList(id) {
    return axios.get(`${url}/${id}/sub-letter-codes`, {
      headers: {
        Authorization: "bearer " + localStorage.getItem("__token__")
      }
    });
  },
  storeSub(id, data) {
    return axios.post(`${url}/${id}/sub-letter-codes`, data, {
      headers: {
        Authorization: "bearer " + localStorage.getItem("__token__")
      }
    });
  },
  deleteSub(id, subId) {
    return axios.delete(`${url}/${id}/sub-letter-codes/${subId}`, {
      headers: {
        Authorization: "bearer " + localStorage.getItem("__token__")
      }
    });
  },
  getTakenCodes() {
    return axios.get(`${url}/taken-code`, {
      headers: {
        Authorization: "bearer " + localStorage.getItem("__token__")
      }
    });
  },
  getTakenSubCodes(id) {
    return axios.get(`${url}/${id}/taken-sub-code`, {
      headers: {
        Authorization: "bearer " + localStorage.getItem("__token__")
      }
    });
  }
};
