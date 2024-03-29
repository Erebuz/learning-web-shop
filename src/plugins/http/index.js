import Vue from "vue";

import axios from "axios";
import VueAxios from "vue-axios";

export const baseUrl =
  process.env.NODE_ENV !== "production"
    ? "http://19.19.1.2:5000/"
    : "http://" + window.location.host + ":5000";

// export const baseUrl = "http://" + window.location.host + ":5000";

axios.defaults.baseURL = baseUrl;
Vue.use(VueAxios, axios);

export default {
  root: process.env.VUE_APP_API_URL,
};
