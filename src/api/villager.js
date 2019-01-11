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
  }
};
