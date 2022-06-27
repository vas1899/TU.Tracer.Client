import { observer } from "mobx-react-lite";
import Calendar from "react-calendar";
import { Menu, Header } from "semantic-ui-react";

export default observer(function PacketFilters() {
  return (
    <>
      <Menu vertical size="large" style={{ width: "100%", marginTop: "2rem" }}>
        <Header icon="filter" attached color="teal" content="Filters" />
        <Menu.Item content="All Activites" /> <Menu.Item content="I'm going" />
        <Menu.Item content="I'm hosting" />
      </Menu>
      <Header />
      <Calendar />
    </>
  );
});
