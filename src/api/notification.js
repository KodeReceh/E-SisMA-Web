import axios from "axios";
const url = process.env.VUE_APP_API_URL + "/users/notifications";

export default {
  getNotifications() {
    return axios.get(url, {
      headers: {
        Authorization: "bearer " + localStorage.getItem("__token__")
      }
    });
  },
  getAllNotifications() {
    return axios.get(`${url}/all`, {
      headers: {
        Authorization: "bearer " + localStorage.getItem("__token__")
      }
    });
  }
};
