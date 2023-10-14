import axios from "axios";

const baseURL = "/v1/api/user/";
// process.env.NODE_ENV === "production"
//   ? "/v1/api/user/"
//   : "http://localhost:3001/v1/api/user/";

const instance = axios.create({
  baseURL: baseURL,
  timeout: 30000,
});

export default instance;
