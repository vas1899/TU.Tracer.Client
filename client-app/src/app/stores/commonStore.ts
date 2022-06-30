import { User, UserFormValues } from "../layout/user/user";
import { makeAutoObservable, reaction } from "mobx";
import agent from "../api/agent";

export default class CommonStore {
  error: string | null = null;
  token: string | null = window.localStorage.getItem("jwt");

  appLoaded: boolean = false;
  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.token,
      (token) => {
        if (token) {
          window.localStorage.setItem("jwt", token);
        } else {
          window.localStorage.removeItem("jwt");
        }
      }
    );
  }

  setToken(token: string | null) {
    this.token = token;
  }
  setAppLoaded = () => {
    this.appLoaded = true;
  };
}
