import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Segment, Container, Header, Image, Button } from "semantic-ui-react";
import { useStore } from "../../../stores/store";
import ModalContainer from "../../common/modal/ModalContainer";
import LoginForm from "../../user/LoginForm";

export default observer(function HomePage() {
  const { accountStore, modalStore } = useStore();
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
            <>
              <Button onClick={() => modalStore.openModal(<LoginForm />)} size="huge" inverted>
                Login
              </Button>
              <Button onClick={() => modalStore.openModal(<LoginForm />)} size="huge" inverted>
                Register
              </Button>
            </>
          )}
        </Container>
      </Segment>
    </>
  );
});
