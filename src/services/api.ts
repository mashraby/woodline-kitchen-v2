import { AxiosResponse } from "axios";
import { instance } from "../config/axios.config";
import { ICategory } from "../interfaces/categorys.interfaces";
import { IDeedline } from "../interfaces/deedline.interface";
import { IFood } from "../interfaces/foods.interfaces";
import { ILunch } from "../interfaces/lunchs.interfaces";
import { IOrder } from "../interfaces/orders.interfaces";
import { IPayment } from "../interfaces/payments.interfacess";
import { ICreateProduct, IProduct } from "../interfaces/products.interface";
import { IRole } from "../interfaces/roles.interfaces";
import { IPerson, IUsersPagination } from "../interfaces/users.interfaces";

// LOGIN Service //

export const login = (
  username: string,
  password: string
): Promise<AxiosResponse> => {
  return instance.post("/", {
    username,
    password,
  });
};

// Users Service //

export const getUsers = (): Promise<Array<IPerson>> => {
  return instance.get("/user").then((res) => res.data);
};

export const getUsersPagination = (
  page: number,
  size: number
): Promise<IUsersPagination> => {
  return instance
    .get(`/user/pagination/?page=${page}&size=${size}`)
    .then((res) => res.data);
};

export const postBalance = (
  id: string,
  amount: number | undefined,
  type: boolean
): Promise<AxiosResponse> => {
  return instance.post("/user/balance", {
    id,
    amount,
    type,
    date: "2023-02-12",
  });
};

export const updateUserRole = (
  id: string,
  role: string
): Promise<AxiosResponse> => {
  return instance.put("/user", {
    id,
    role,
  });
};

export const updateUserStatus = (user: string, type: boolean) => {
  return instance.put("/user/status", {
    user,
    type,
  });
};

// Roles Service //
export const getRoles = (): Promise<Array<IRole>> => {
  return instance.get("/role").then((res) => res.data);
};

export const postRole = (title: string): Promise<AxiosResponse> => {
  return instance.post("/role", {
    title,
  });
};

// Food Category Service //

export const getCategory = (): Promise<Array<ICategory>> => {
  return instance.get("/category").then((res) => res.data);
};

export const postCategory = (name: string): Promise<AxiosResponse> => {
  return instance.post("/category", {
    name,
  });
};

// Foods Service //

export const getFoods = (): Promise<Array<IFood>> => {
  return instance.get("/food").then((res: AxiosResponse) => res.data);
};

export const postFood = (
  name: string,
  cost: number | undefined,
  category: string,
  products: Array<ICreateProduct>
): Promise<AxiosResponse> => {
  return instance.post("/food/withproduct", {
    name,
    cost,
    category,
    products,
  });
};

export const updateFoodPrice = (
  id: string,
  cost: number | undefined
): Promise<AxiosResponse> => {
  return instance.put("/food", {
    id,
    cost,
  });
};

// Orders Service //

export const getOrders = (): Promise<Array<IOrder>> => {
  return instance.get("/order").then((res: AxiosResponse) => res.data);
};

// Payments Service //

export const getPayments = (): Promise<Array<IPayment>> => {
  return instance.get("/payment").then((res: AxiosResponse) => res.data);
};

// Deedline Service //

export const getDeedlines = (): Promise<Array<IDeedline>> => {
  return instance.get("/deadline").then((res: AxiosResponse) => res.data);
};

export const updateDeedlines = (
  id: string,
  time: number | undefined
): Promise<AxiosResponse> => {
  return instance.put("/deadline", {
    id,
    time,
  });
};

// Products Service //

export const getProducts = (): Promise<Array<IProduct>> => {
  return instance.get("/product").then((res: AxiosResponse) => res.data);
};

export const postProduct = (
  name: string,
  cost: number
): Promise<AxiosResponse> => {
  return instance.post("/product", {
    name,
    cost,
  });
};

// Lunchs Service //

export const getLunchs = (): Promise<Array<ILunch>> => {
  return instance.get("/trip").then((res: AxiosResponse) => res.data);
};
