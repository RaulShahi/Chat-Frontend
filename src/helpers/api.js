import axios from "axios";

export const API_PATH = "/api/";

const AXIOS = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT || "http://localhost:5000",
});

// Setting auth (if JWT is present)

const token = localStorage.getItem("userInfo")?.token;

if (token) {
  AXIOS.defaults.headers["Authorization"] = `Beared ${token}`;
}

export default AXIOS;
