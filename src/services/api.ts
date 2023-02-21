import axios, { AxiosResponse } from "axios";
import { ICategory } from "../interfaces/categorys.interfaces";
import { IFood } from "../interfaces/foods.interfaces";
import { IOrder } from "../interfaces/orders.interfaces";
import { IPayment } from "../interfaces/payments.interfacess";
import { IRole } from "../interfaces/roles.interfaces";
import { IPerson } from "../interfaces/users.interfaces";

// LOGIN Service //

export const login = (
  username: string,
  password: string
): Promise<AxiosResponse> => {
  return axios.post("/", {
    username,
    password,
  });
};

// Users Service //

export const getUsers = (): Promise<Array<IPerson>> => {
  return axios.get("/user").then((res) => res.data);
};

export const postBalance = (
  id: string,
  amount: number | undefined,
  type: boolean
): Promise<AxiosResponse> => {
  return axios.post("/user/balance", {
    id,
    amount,
    type,
    date: "2023-02-12",
  });
};

// Roles Service //

export const getRoles = (): Promise<Array<IRole>> => {
  return axios.get("/role").then((res) => res.data);
};

export const postRole = (title: string): Promise<AxiosResponse> => {
  return axios.post("/role", {
    title,
  });
};

// Food Category Service //

export const getCategory = (): Promise<Array<ICategory>> => {
  return axios.get("/category").then((res) => res.data);
};

export const postCategory = (name: string): Promise<AxiosResponse> => {
  return axios.post("/category", {
    name,
  });
};

// Foods Service //

export const getFoods = (): Promise<Array<IFood>> => {
  return axios.get("/food").then((res: AxiosResponse) => res.data);
};

export const postFood = (
  name: string,
  cost: number | undefined,
  category: string
): Promise<AxiosResponse> => {
  return axios.post("/food", {
    name,
    cost,
    category,
  });
};

// Orders Service //

export const getOrders = (): Promise<Array<IOrder>>=> {
  return axios.get("/order")
    .then((res: AxiosResponse) => res.data)
}

// Payments Service //

export const getPayments = (): Promise<Array<IPayment>> => {
  return axios.get("/payment").then((res: AxiosResponse) => res.data)
}