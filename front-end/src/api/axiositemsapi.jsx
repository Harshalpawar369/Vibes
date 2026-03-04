import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/api/item/vibe",
  withCredentials: true,
});

export default instance;