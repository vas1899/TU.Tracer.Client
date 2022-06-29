import { createContext, useContext } from "react";
import AccountStore from "./accountStore";
import PacketStore from "./packetStore";

interface Store {
  packetStore: PacketStore;
  accountStore: AccountStore;
}

export const store: Store = {
  packetStore: new PacketStore(),
  accountStore: new AccountStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
