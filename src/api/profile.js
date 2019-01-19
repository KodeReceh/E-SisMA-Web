import axios from "axios";

const url = process.env.VUE_APP_API_URL + "/profile";

export default {
  get() {
    return axios.get(`${url}`, {
      headers: {
        Authorization: "bearer " + localStorage.getItem("__token__")
      }
    });
  },
  update(data) {
    return axios.put(`${url}`, data, {
      headers: {
        Authorization: "bearer " + localStorage.getItem("__token__")
      }
    });
  },
  getSign(filename) {
    return axios.get(`${url}/get-sign/${filename}`, {
      responseType: "blob",
      headers: {
        Authorization: "bearer " + localStorage.getItem("__token__")
      }
    });
  }
};
