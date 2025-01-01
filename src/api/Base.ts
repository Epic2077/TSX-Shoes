import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:8000/",
});
export default Api;

export const BASE_URL = "http://localhost:8000";
