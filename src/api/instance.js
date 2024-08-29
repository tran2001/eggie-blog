import axios from "axios";

const instance = axios.create({
  // baseURL: "https://eggies2-9bfcyrrb.b4a.run/api",
  baseURL: "http://localhost:8080/api",
});

instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
