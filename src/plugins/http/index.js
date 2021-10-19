import Vue from "vue";

import axios from "axios";
import VueAxios from "vue-axios";

// export const baseUrl =
//   process.env.NODE_ENV !== "production"
//     ? "http://10.0.117.63/"
//     : "http://" + window.location.host;

export const baseUrl = "http://localhost/";

axios.defaults.baseURL = baseUrl;
Vue.use(VueAxios, axios);

export default {
  root: process.env.VUE_APP_API_URL,
};
