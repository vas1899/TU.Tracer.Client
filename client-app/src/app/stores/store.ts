import { createContext, useContext } from "react";
import PacketStore from "./packetStore";

interface Store {
  packetStore: PacketStore;
}

export const store: Store = {
  packetStore: new PacketStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
