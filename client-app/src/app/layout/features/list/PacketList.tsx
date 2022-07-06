import { observer } from "mobx-react-lite";
import { Fragment, useEffect } from "react";
import { Grid, Header } from "semantic-ui-react";
import { Packet } from "../../../models/Packet";
import { useStore } from "../../../stores/store";
import LoadingIndicator from "../../LoadingIndicator";
import PacketFilters from "../details/PacketFilters";
import PacketItem from "./PacketItem";

export default observer(function PacketList() {
  const { packetStore } = useStore();
  const { groupedActrivities, loadPackets, packets } = packetStore;

  useEffect(() => {
    if (packets.size <= 1) {
      loadPackets();
    }
  }, [packets, loadPackets]);

  const { loading } = packetStore;

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <Grid>
        <Grid.Column width="10">
          {groupedActrivities.map(([group, packets]) => (
            <Fragment key={group}>
              <Header sub color="blue">
                {group}
              </Header>
              {packets.map((packet: Packet) => (
                <PacketItem key={packet.id} packet={packet} />
              ))}
            </Fragment>
          ))}
        </Grid.Column>
        <Grid.Column width="6">{/* <PacketFilters /> */}</Grid.Column>
      </Grid>
    </>
  );
});
