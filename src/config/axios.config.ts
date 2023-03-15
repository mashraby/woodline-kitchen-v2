import axios, { AxiosInstance } from "axios";

export const instance: AxiosInstance = axios.create({
  baseURL: "http://localhost:9000",
  headers: {
    "Content-Type": "application/json",
  },
});