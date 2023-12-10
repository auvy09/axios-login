import axios from "axios";
const baseURL = axios.create({
  baseURL: "http://172.17.0.87:8888/api/v1/web-app/",
});

baseURL.defaults.headers.common["Authorization"] = "Auth Token";
export default baseURL;
