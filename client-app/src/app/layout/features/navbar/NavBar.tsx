import { observer } from "mobx-react-lite";
import { Link, NavLink } from "react-router-dom";
import { Button, Icon, Menu, Image, Dropdown, Container } from "semantic-ui-react";
import { useStore } from "../../../stores/store";

export default observer(function NavBar() {
  const {
    accountStore: { user, logout },
  } = useStore();
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} to="/" exact>
          <Icon name="boxes" circular />
          Packet Tracer
        </Menu.Item>
        <Menu.Item as={NavLink} to="/packets" name="Packets" />
        <Menu.Item>
          <Button as={NavLink} to="/createPacket" positive content="Create" />
        </Menu.Item>
        <Menu.Item as={Link} to="/errors" name="Testing" />
        <Menu.Item position="right">
          <Image src={user?.image || "/assets/user.png"} avatar spaced="right" />
          <Dropdown pointing="top left" text={user?.displayName}>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to={`/accounts/${user?.username}`} text="Account" />
              <Dropdown.Item onClick={logout} icon="power" text="Logout" />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </Container>
    </Menu>
  );
});
