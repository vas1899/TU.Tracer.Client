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

  getUser = async () => {
    try {
      const user = await agent.Account.getCurrent();
      runInAction(() => (this.user = user));
    } catch (error) {
      console.log(error);
    }
  };

  get isLoggedIn() {
    return !!this.user;
  }

  login = async (userFormValues: UserFormValues) => {
    try {
      const user = await agent.Account.login(userFormValues);
      store.commonStore.setToken(user.token);
      runInAction(() => (this.user = user));
      history.push("/packets");
      store.modalStore.closeModal();
    } catch (error) {
      throw error;
    }
  };

  register = async (userFormValues: UserFormValues) => {
    try {
      const user = await agent.Account.register(userFormValues);
      store.commonStore.setToken(user.token);
      runInAction(() => (this.user = user));
      history.push("/packets");
      store.modalStore.closeModal();
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
