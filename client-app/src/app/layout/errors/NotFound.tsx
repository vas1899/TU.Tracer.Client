import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";
export default function NotFound() {
  return (
    <Segment placeholder>
      <Header icon>
        <Icon name="search" /> Oops - we've looked everywhere and could not find this.
      </Header>
      <Segment.Inline Inline>
        <Button as={Link} to="/packets" primary>
          Return to packets page
        </Button>
      </Segment.Inline>
    </Segment>
  );
}
