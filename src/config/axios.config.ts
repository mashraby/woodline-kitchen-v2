import axios, { AxiosInstance } from "axios";

export const instance: AxiosInstance = axios.create({
  baseURL: "http://64.226.90.160:5050",
  headers: {
    "Content-Type": "application/json",
  },
});
