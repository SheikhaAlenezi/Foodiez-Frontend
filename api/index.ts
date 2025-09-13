import axios from "axios";
import { getToken } from "./storage";

const instance = axios.create({
  baseURL: "http://192.168.8.107:8000/api",
});
// little-shaikha "http://:8000/api"
//
// sheikha "http://192.168.8.107:8000/api"
//
instance.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export default instance;
