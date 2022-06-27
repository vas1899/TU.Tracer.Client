import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Segment } from "semantic-ui-react";
import { Packet } from "../../../models/Packet";

interface Prop {
  packet: Packet;
}

export default observer(function PacketItem({ packet }: Prop) {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src={`/assets/user.png`} />
            <Item.Content>
              <Item.Header as={Link} to={`/packets/${packet.id}`}>
                {packet.title}
              </Item.Header>
              <Item.Description>Hosted by User1</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" /> {format(packet.date, "dd MMM yyyy h:mm aa")}
          <Icon name="marker" /> {packet.city}
        </span>
      </Segment>
      <Segment secondary>Attendees go here</Segment>
      <Segment clearing>
        <span> {packet.description}</span>
        <Button
          as={Link}
          to={`/packets/${packet.id}`}
          color="blue"
          floated="right"
          content="View"
        />
      </Segment>
    </Segment.Group>
  );
});
