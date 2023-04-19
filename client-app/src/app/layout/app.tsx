import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Container } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { ToastContainer } from "react-toastify";
//hooks
import { useStore } from "../stores/store";
//components
import NavBar from "./NavBar";
import ModalContainer from "../common/modals/ModalContainer";
//pages
import HomePage from "../../features/home/HomePage";
import LoadingComponent from "./LoadingComponent";

function App ()
{
  const location = useLocation();
  const { commonStore, userStore } = useStore();

  useEffect( () =>
  {
    if ( commonStore.token )
    {
      userStore.getUser().finally( () => commonStore.setAppLoaded() );
    }
    else
    {
      commonStore.setAppLoaded();
    }
  }, [ commonStore, userStore ] );

  if ( !commonStore.appLoaded ) return <LoadingComponent content="Loading app..." />;

  return (
    <>
      <ModalContainer />
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      { location.pathname === "/" ? <HomePage /> : (
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