import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Segment, Container, Header, Image, Button } from "semantic-ui-react";

export default observer(function HomePage() {
  return (
    <>
      <Segment inverted textAlign="center" vertical className="masthead">
        <Container text>
          <Header as="h1" inverted>
            <Image size="massive" src="/assets/logo.png" alt="logo" style={{ marginBottom: 12 }} />
            Repackets
          </Header>

          <Header as="h2" inverted content="Welcome to Repackets" />

          <Button as={Link} to="/login" size="huge" inverted>
            Login
          </Button>
        </Container>
      </Segment>
    </>
  );
});
