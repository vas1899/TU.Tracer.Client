import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../..";
import { User, UserFormValues } from "../layout/user/user";
import { Packet } from "../models/Packet";

axios.defaults.baseURL = "http://localhost:5000/api";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.interceptors.response.use(
  async (response) => {
    await sleep(0);
    return response;
  },
  (error: AxiosError) => {
    const { data, status } = error.response!;
    switch (status) {
      case 400:
        toast.error("bad request");
        console.error(data);
        break;
      case 401:
        toast.error("unauthorised");
        break;
      case 404:
        toast.error("not found");
        history.push("/not_found");
        break;
      case 500:
        toast.error("server error");
        break;
    }
    return Promise.reject(error);
  }
);

const responceBody = (response: AxiosResponse) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responceBody),
  post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responceBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responceBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responceBody),
};

const Packets = {
  list: () => requests.get<Packet>("/packets"),
  details: (id: string) => requests.get<Packet>(`/packets/${id}`),
  create: (packet: Packet) => requests.post(`/packets/`, packet),
  update: (packet: Packet) => requests.put(`/packets/${packet.id}`, packet),
  del: (id: string) => requests.delete(`/packets/${id}`),
};

const Account = {
  getCurrent: () => requests.get<User>(`/account`),
  login: (user: UserFormValues) => requests.post<User>(`/account/login`, user),
  register: (user: UserFormValues) => requests.post<User>(`/account/register`, user),
};

const agent = {
  Packets,
  Account,
};

export default agent;
