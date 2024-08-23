import axios from "axios";

const apiClient = axios.create({
  baseURL: "/api", // Use relative URL to work with both development and production
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
