import axios from "axios";

// Determine base url based on development or production mode
const baseURL =
  process.env.NODE_ENV === "production"
    ? "/v1/api/settings/"
    : "http://localhost:3500/v1/api/settings/";

  const instance = axios.create({
  baseURL: baseURL,
  timeout: 30000,
});

export default instance;
 