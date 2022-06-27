import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Header, Item, Segment, Image } from "semantic-ui-react";
import { Packet } from "../../../models/Packet";

const packetImageStyle = {
  filter: "brightness(30%)",
};

const packetImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white",
};

interface Props {
  packet: Packet;
}

export default observer(function PacketDetailedHeader({ packet }: Props) {
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        <Image
          src={`/assets/categoryImages/${packet.category}.jpg`}
          fluid
          style={packetImageStyle}
        />
        <Segment style={packetImageTextStyle} basic>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header size="huge" content={packet.title} style={{ color: "white" }} />
                <p>{format(new Date(packet.date), "dd MMM yyyy h:mm aa")}</p>
                <p>
                  Hosted by <strong>Bob</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached="bottom">
        <Button color="teal">Join Packet</Button>
        <Button>Cancel attendance</Button>
        <Button as={Link} to={`/edit/${packet.id}`} color="orange" floated="right">
          Manage Event
        </Button>
      </Segment>
    </Segment.Group>
  );
});
