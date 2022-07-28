import Axios from "axios";

const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

axios.interceptors.request.use(function (config) {
  let token = !!global?.window ?? localStorage.getItem("token");
  config.headers = config.headers ?? {};
  config.headers.Authorization = "Bearer " + token;
  return config;
});

export default axios;
