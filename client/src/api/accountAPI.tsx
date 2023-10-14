import axios from "axios";

// Determine base url based on development or production mode
const baseURL = "/v1/api/account/";
// process.env.NODE_ENV === "production"
//   ? "/v1/api/account/"
//   : "http://localhost:3001/v1/api/account/";

const instance = axios.create({
  baseURL: baseURL,
  timeout: 30000,
});

export default instance;
