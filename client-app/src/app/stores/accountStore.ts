import { User, UserFormValues } from "../layout/user/user";
import { makeAutoObservable } from "mobx";
import agent from "../api/agent";

export default class AccountStore {
  user: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get isLoggedin() {
    return !!this.user;
  }

  login = async (userFormValues: UserFormValues) => {
    try {
      const user = await agent.Account.login(userFormValues);
      console.log(user);
      //   this.user = user;
    } catch (error) {
      throw error;
    }
  };
}
