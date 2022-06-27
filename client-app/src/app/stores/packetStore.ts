import { format } from "date-fns";
import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Packet } from "../models/Packet";

export default class PacketStore {
  packets: Map<string, Packet> = new Map();
  submitting: boolean = false;
  loading: boolean = false;
  selectedPacket: Packet | undefined = undefined;
  editedPacket: Packet | undefined = undefined;
  isInCreateMode: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setLoading = (state: boolean) => {
    this.loading = state;
  };

  setSubmitting = (state: boolean) => {
    this.submitting = state;
  };
  selectPacket = (id: string) => {
    this.selectedPacket = this.packets.get(id);
    this.isInCreateMode = false;
  };
  loadPackets = async () => {
    this.setLoading(true);
    try {
      const packets: Packet[] = await agent.Packets.list();
      packets.forEach((packet: Packet) => {
        this.setPacket(packet);
      });
      this.setLoading(false);
    } catch (error) {
      this.setLoading(false);
      console.error(error);
    }
  };

  loadPacket = async (id: string) => {
    let packet = this.packets.get(id);
    if (packet) {
      this.selectedPacket = packet;
      return packet;
    } else {
      this.setLoading(true);
      try {
        packet = await agent.Packets.details(id);
        this.selectedPacket = packet;
        if (packet) this.setPacket(packet);
        this.setLoading(false);
        return packet;
      } catch (error) {
        console.error(error);
        this.setLoading(false);
      }
    }
  };

  setPacket = (packet: Packet) => {
    packet.date = this.getDateToLocalTime(packet.date);
    this.packets.set(packet.id, packet);
  };

  getDateToLocalTime = (date: Date) => {
    date = new Date(date);
    date = new Date(date.valueOf() - date.getTimezoneOffset() * 60 * 1000);
    return date;
  };

  get groupedActrivities() {
    return Object.entries(
      this.getPacketsSortDate().reduce((packets, packet) => {
        const date = format(packet.date, "dd-MM-yyyy");
        packets[date] = packets[date] ? [...packets[date], packet] : [packet];
        return packets;
      }, {} as { [key: string]: Packet[] })
    );
  }
  getPacketsSortDate = () => {
    return Array.from(this.packets.values()).sort((a, b) => a.date.getTime() - b.date.getTime());
  };
  cancelSelectedPacket = () => {
    this.selectedPacket = undefined;
  };

  editPacket = (id: string) => {
    this.editedPacket = this.packets.get(id);
  };
  cancelEditedPacket = () => {
    this.editedPacket = undefined;
    this.isInCreateMode = false;
  };

  changePacket = (packet: Packet) => {
    this.setSubmitting(true);

    if (packet.id) {
      this.editRequestPacket(packet);
    } else {
      this.createRequestPacket(packet);
    }
  };

  editRequestPacket = async (packet: Packet) => {
    this.setSubmitting(true);
    try {
      await agent.Packets.update(packet);
      runInAction(() => {
        this.packets.delete(packet.id);
        this.packets.set(packet.id, packet);
        this.setSubmitting(false);
        this.cancelEditedPacket();
      });
    } catch (error) {
      this.setSubmitting(false);
      console.error(error);
    }
  };

  createRequestPacket = async (packet: Packet) => {
    this.setSubmitting(true);
    try {
      await agent.Packets.create(packet);
      runInAction(() => {
        this.packets.set(packet.id, packet);
        this.setSubmitting(false);
        this.cancelEditedPacket();
      });
    } catch (error) {
      this.setSubmitting(false);
      console.error(error);
    }
  };

  deletePacket = async (id: string) => {
    this.setSubmitting(true);
    try {
      await agent.Packets.del(id);
      runInAction(() => {
        this.packets.delete(id);
        this.setSubmitting(false);
      });
    } catch (error) {
      this.setSubmitting(false);
      console.error(error);
    }
  };
}
