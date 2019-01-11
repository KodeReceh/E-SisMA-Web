import axios from "axios";

const url = process.env.VUE_APP_API_URL + "/outcoming-letter-drafts";

export default {
  getList() {
    return axios.get(`${url}`, {
      headers: {
        Authorization: "bearer " + localStorage.getItem("__token__")
      }
    });
  },
  download(id) {
    return axios.get(`${url}/download/${id}`, {
      responseType: "blob",
      "Cache-Control": "no-cache",
      headers: {
        Authorization: "bearer " + localStorage.getItem("__token__")
      }
    });
  },
  delete(id) {
    return axios.delete(`${url}/delete/${id}`, {
      headers: {
        Authorization: "bearer " + localStorage.getItem("__token__")
      }
    });
  },
  getDraft(id) {
    return axios.get(`${url}/${id}`, {
      headers: {
        Authorization: "bearer " + localStorage.getItem("__token__")
      }
    });
  },
  deleteGeneratedFile(id) {
    return axios.delete(`${url}/generated-file/${id}`, {
      headers: {
        Authorization: "bearer " + localStorage.getItem("__token__")
      }
    });
  },
  sign(id) {
    return axios.get(`${url}/sign/${id}`, {
      headers: {
        Authorization: "bearer " + localStorage.getItem("__token__")
      }
    });
  },
  unsign(id) {
    return axios.get(`${url}/unsign/${id}`, {
      headers: {
        Authorization: "bearer " + localStorage.getItem("__token__")
      }
    });
  }
};
