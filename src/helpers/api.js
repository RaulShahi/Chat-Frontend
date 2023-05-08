import axios from "axios";

export const API_PATH = "/api/";

const AXIOS = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT || "http://localhost:5000",
});

export default AXIOS;
