import { Container } from "semantic-ui-react";
import PacketList from "./features/list/PacketList";
import { observer } from "mobx-react-lite";
import NavBar from "./features/navbar/NavBar";
import { Route, Switch, useLocation } from "react-router-dom";
import PacketForm from "./features/form/PacketForm";
import HomePage from "./features/homePage/HomePage";
import PacketDetails from "./features/details/PacketDetails";
import TestErrors from "./errors/TestErrors";
import { ToastContainer } from "react-toastify";
import NotFound from "./errors/NotFound";
import LoginForm from "./user/LoginForm";

function App() {
  const location = useLocation();
  return (
    <>
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <>
            <NavBar />
            <ToastContainer position="bottom-right" hideProgressBar />
            <Container style={{ marginTop: "7rem" }}>
              <Switch>
                <Route exact path="/packets" component={PacketList} />
                <Route exact path="/packets/:id" component={PacketDetails} />
                <Route
                  key={location.key}
                  path={["/createPacket", "/edit/:id"]}
                  component={PacketForm}
                />
                <Route path="/errors" component={TestErrors} />
                <Route path="/login" component={LoginForm} />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </>
        )}
      />
    </>
  );
}

export default observer(App);
