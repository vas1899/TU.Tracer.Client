import { createContext, useContext } from "react";
import AccountStore from "./accountStore";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import PacketStore from "./packetStore";

interface Store {
  packetStore: PacketStore;
  accountStore: AccountStore;
  commonStore: CommonStore;
  modalStore: ModalStore;
}

export const store: Store = {
  packetStore: new PacketStore(),
  accountStore: new AccountStore(),
  commonStore: new CommonStore(),
  modalStore: new ModalStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
