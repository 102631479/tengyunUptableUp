import axios from "@/libs/api.request";
export default {
  methods: {
    // 增删改查
    add(data) {
      return axios.request({
        url: this.url,
        method: "post",
        data
      });
    },

    del(id) {
      return axios.request({
        url: `${this.url}/` + id,
        method: "delete"
      });
    },

    edit(data) {
      return axios.request({
        url: this.url,
        method: "put",
        data
      });
    },

    get(params) {
      return axios.request({
        url: `${this.url}/page`,
        method: "get",
        params
      });
    },
    getList(params) {
      return axios.request({
        url: `${this.url}/list`,
        method: "get",
        params
      });
    }
  }
}