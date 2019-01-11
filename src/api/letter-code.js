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
  }
};
