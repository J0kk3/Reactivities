import { Outlet, useLocation } from "react-router-dom";
import { Container } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { ToastContainer } from "react-toastify";
//components
import NavBar from "./NavBar";
//pages
import HomePage from "../../features/home/HomePage";

function App ()
{
  const location = useLocation();

  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      { location.pathname !== "/" ? <HomePage /> : (
        <>
          <NavBar />
          <Container style={ { marginTop: "7rem" } }>
            <Outlet />
          </Container>
        </>
      ) }
    </>
  );
}

export default observer( App );