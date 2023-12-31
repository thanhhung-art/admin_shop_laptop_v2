import { IGetUsers } from "@/types/customer";
import { IGetOrder, IGetOrders, IOrder, IOrderUpdate } from "@/types/order";
import {
  IGetProduct,
  IGetProducts,
  IGetProductsInfinity,
} from "@/types/product";
import axios from "axios";

export const Fetch = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const getProducts = async (query: string) => {
  const res = await Fetch(`/products?query=${query}`);
  return res.data as IGetProducts;
};

export const getProductsInfinity = async (page: number) => {
  const res = await Fetch(`/products?query=${page}`);
  return res.data as IGetProductsInfinity;
};

export const getProduct = async (id: string) => {
  const res = await Fetch(`/products/${id}`);
  return res.data as IGetProduct;
};

export const getUsers = async () => {
  const res = await Fetch("/users");
  return res.data as IGetUsers;
};

export const getOrders = async (query?: string) => {
  const res = await Fetch(`/orders?${query ? "query=" + query : ""}`);
  return res.data as IGetOrders;
};

export const updateOrder = async (id: string, data: IOrderUpdate<IOrder>) => {
  const res = await Fetch.put("/orders/" + id, data);
  return res.data as IGetOrder;
};
