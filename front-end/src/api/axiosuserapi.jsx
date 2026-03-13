import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/api/auth/vibe",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;