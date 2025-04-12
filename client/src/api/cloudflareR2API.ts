import axios from "axios";

const timeout = 30000;

// Determine base url based on development or production mode
const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://typingbooks.com"
    : "https://typingbooks.com";

const instance = axios.create({
  baseURL,
  timeout,
});

export default instance;
