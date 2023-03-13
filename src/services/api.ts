import axios, { AxiosResponse } from "axios";
import { ICategory } from "../interfaces/categorys.interfaces";
import { IDeedline } from "../interfaces/deedline.interface";
import { IFood } from "../interfaces/foods.interfaces";
import { IOrder } from "../interfaces/orders.interfaces";
import { IPayment } from "../interfaces/payments.interfacess";
import { IProduct } from "../interfaces/products.interface";
import { IRole } from "../interfaces/roles.interfaces";
import { IPerson, IUsersPagination } from "../interfaces/users.interfaces";

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

export const getUsersPagination = (
  page: number,
  size: number
): Promise<IUsersPagination> => {
  return axios
    .get(`/user/pagination/?page=${page}&size=${size}`)
    .then((res) => res.data);
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

// Change user

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

export const updateFoodPrice = (
  id: string,
  cost: number | undefined
): Promise<AxiosResponse> => {
  return axios.put("/food", {
    id,
    cost,
  });
};

// Orders Service //

export const getOrders = (): Promise<Array<IOrder>> => {
  return axios.get("/order").then((res: AxiosResponse) => res.data);
};

// Payments Service //

export const getPayments = (): Promise<Array<IPayment>> => {
  return axios.get("/payment").then((res: AxiosResponse) => res.data);
};

// Deedline Service //

export const getDeedlines = (): Promise<Array<IDeedline>> => {
  return axios.get("/deadline").then((res: AxiosResponse) => res.data);
};

export const updateDeedlines = (
  id: string,
  time: number | undefined
): Promise<AxiosResponse> => {
  return axios.put("/deadline", {
    id,
    time,
  });
};

// Products Service //

export const getProducts = (): Promise<Array<IProduct>> => {
  return axios.get("/product").then((res: AxiosResponse) => res.data);
};

export const postProduct = (
  name: string,
  cost: number
): Promise<AxiosResponse> => {
  return axios.post("/product", {
    name,
    cost,
  });
};
