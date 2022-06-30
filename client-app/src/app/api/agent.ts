import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../..";
import { User, UserFormValues } from "../layout/user/user";
import { Packet } from "../models/Packet";
import { store } from "../stores/store";

axios.defaults.baseURL = "http://localhost:5000/api";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.interceptors.request.use((config) => {
  const token = store.commonStore.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    await sleep(0);
    return response;
  },
  (error: AxiosError) => {
    const { data, status, config } = error.response!;
    switch (status) {
      case 400:
        if (config.method === "get" && data.errors.hasOwnProperty("id")) {
          history.push("/not-found");
        }
        if (data.errors) {
          const modalStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modalStateErrors.push(data.errors[key]);
            }
          }
          console.log(data);
          throw modalStateErrors.flat();
        } else {
          console.log(data);

          toast.error(data);
        }
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
