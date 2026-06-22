import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/api/vibe/payment",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;