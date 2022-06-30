import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Segment, Container, Header, Image, Button, Icon } from "semantic-ui-react";
import { useStore } from "../../../stores/store";
import LoginForm from "../../user/LoginForm";
import RegisterForm from "../../user/RegisterForm";

export default observer(function HomePage() {
  const { accountStore, modalStore } = useStore();
  return (
    <>
      <Segment inverted textAlign="center" vertical className="masthead">
        <Container text>
          <Header as="h1" inverted>
            <Icon name="boxes" />
            Packet Tracer
          </Header>
          <Header as="h2" inverted content="Welcome" />
          {accountStore.isLoggedIn ? (
            <Button as={Link} to="/packets" size="huge" inverted>
              Go to Packets
            </Button>
          ) : (
            <>
              <Button onClick={() => modalStore.openModal(<LoginForm />)} size="huge" inverted>
                Login
              </Button>
              <Button onClick={() => modalStore.openModal(<RegisterForm />)} size="huge" inverted>
                Register
              </Button>
            </>
          )}
        </Container>
      </Segment>
    </>
  );
});
