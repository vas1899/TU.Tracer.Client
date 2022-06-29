import { User, UserFormValues } from "../layout/user/user";
import { makeAutoObservable } from "mobx";
import agent from "../api/agent";

export default class CommonStore {
  error: string | null = null;
  token: string | null = null;
  appLoaded: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setToken = (token: string | null) => {
    if (token) window.localStorage.setItem("jwt", token);
    this.token = token;
  };

  setAppLoaded = () => {
    this.appLoaded = true;
  };
}
