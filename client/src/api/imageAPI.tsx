import axios from "axios";
import CurrentAPIVersion from "../utils/CurrentAPIVersion";

const version = CurrentAPIVersion();
const timeout = 30000;

const baseURL = process.env.NODE_ENV
  ? `/${version}/api/images/`
  : "http://localhoste:3500/${version}/api/images/";

const instance = axios.create({
  baseURL,
  timeout,
});

export default instance;
