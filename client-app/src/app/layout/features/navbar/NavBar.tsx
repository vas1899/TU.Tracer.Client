import { observer } from "mobx-react-lite";
import { Link, NavLink } from "react-router-dom";
import { Button, Icon, Menu } from "semantic-ui-react";

export default observer(function NavBar() {
  return (
    <Menu inverted fixed="top">
      <Menu.Item as={NavLink} to="/" exact>
        <Icon name="users" circular />
        Socialfy
      </Menu.Item>
      <Menu.Item as={NavLink} to="/packets" name="Packets" />
      <Menu.Item>
        <Button as={NavLink} to="/createPacket" positive content="Create" />
      </Menu.Item>
      <Menu.Item as={Link} to="/errors" name="Testing" />
    </Menu>
  );
});
