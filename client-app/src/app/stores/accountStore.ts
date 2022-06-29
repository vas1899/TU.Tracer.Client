import { User, UserFormValues } from "../layout/user/user";
import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { store } from "./store";
import { history } from "../..";

export default class AccountStore {
  user: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get isLoggedIn() {
    return !!this.user;
  }

  login = async (userFormValues: UserFormValues) => {
    try {
      const user = await agent.Account.login(userFormValues);
      store.commonStore.setToken(user.token);
      runInAction(() => (this.user = user));
      history.push("/packets");
    } catch (error) {
      throw error;
    }
  };

  logout = async () => {
    store.commonStore.setToken(null);
    window.localStorage.removeItem("jwt");
    this.user = null;
    history.push("/");
  };
}
