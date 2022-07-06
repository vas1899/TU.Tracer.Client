import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import { useStore } from "../../../stores/store";
import LoadingIndicator from "../../LoadingIndicator";
import PacketDetailedChat from "./PacketDetailedChat";
import PacketDetailedHeader from "./PacketDetailedHeader";
import PacketDetailedInfo from "./PacketDetailedInfo";
import PacketDetailedSidebar from "./PacketDetailedSidebar";
import PacketDetailsQRCode from "./PacketDetailsQRCode";

export default observer(function PacketDetails() {
  const { packetStore } = useStore();
  const { selectedPacket: packet, loadPacket } = packetStore;
  let { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) loadPacket(id);
  }, [id, loadPacket]);

  if (packet === undefined) {
    return <></>;
  }

  const { loading } = packetStore;

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        <PacketDetailedHeader packet={packet} /> <PacketDetailedInfo packet={packet} />
        {/* <PacketDetailedChat /> */}
      </Grid.Column>
      <Grid.Column width={6}>
        <PacketDetailsQRCode id={packet.id} />
        {/* <PacketDetailedSidebar /> */}
      </Grid.Column>
    </Grid>
  );
});
