import { createContext, useContext } from "react";
import AccountStore from "./accountStore";
import CommonStore from "./commonStore";
import PacketStore from "./packetStore";

interface Store {
  packetStore: PacketStore;
  accountStore: AccountStore;
  commonStore: CommonStore;
}

export const store: Store = {
  packetStore: new PacketStore(),
  accountStore: new AccountStore(),
  commonStore: new CommonStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
