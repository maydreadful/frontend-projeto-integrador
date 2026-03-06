import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    "https://backend-projeto-integrador-s6n2.onrender.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;