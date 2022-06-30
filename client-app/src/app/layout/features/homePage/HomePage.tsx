import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Segment, Container, Header, Image, Button } from "semantic-ui-react";
import { useStore } from "../../../stores/store";

export default observer(function HomePage() {
  const { accountStore } = useStore();
  return (
    <>
      <Segment inverted textAlign="center" vertical className="masthead">
        <Container text>
          <Header as="h1" inverted>
            <Image size="massive" src="/assets/logo.png" alt="logo" style={{ marginBottom: 12 }} />
            Packet Tracer
          </Header>
          <Header as="h2" inverted content="Welcome" />
          {accountStore.isLoggedIn ? (
            <Button as={Link} to="/packets" size="huge" inverted>
              Go to Packets
            </Button>
          ) : (
            <Button as={Link} to="/login" size="huge" inverted>
              Login
            </Button>
          )}
        </Container>
      </Segment>
    </>
  );
});
