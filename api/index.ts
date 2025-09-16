import axios from "axios";
import BASE_URL from "./baseurl";
import { getToken } from "./storage";

const instance = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: { "Cache-Control": "no-cache" },
});

instance.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export default instance;
