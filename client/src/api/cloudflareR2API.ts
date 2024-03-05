import axios from "axios";

const timeout = 30000;

// Determine base url based on development or production mode
const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://pub-e4ad4d9970364e028c281a4d874c1cf0.r2.dev"
    : "https://pub-e4ad4d9970364e028c281a4d874c1cf0.r2.dev";

const instance = axios.create({
  baseURL,
  timeout,
});

export default instance;
