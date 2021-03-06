import axios from "axios";

const url = process.env.VUE_APP_API_URL + "/letters";

export default {
  get(id) {
    return axios.get(`${url}/${id}`, {
      headers: {
        Authorization: "bearer " + localStorage.getItem("__token__")
      }
    });
  },
  getNumbers() {
    return axios.get(`${url}/get-numbers`, {
      headers: {
        Authorization: "bearer " + localStorage.getItem("__token__")
      }
    });
  }
};
