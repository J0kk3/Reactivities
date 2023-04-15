import { useEffect } from "react";
import { Container } from "semantic-ui-react";
//hooks
import { useStore } from "../stores/store";
//components
import NavBar from './NavBar';
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import LoadingComponent from "./LoadingComponent";
import { observer } from "mobx-react-lite";

function App ()
{
  const { activityStore } = useStore();

  useEffect( () =>
  {
    activityStore.loadActivities();
  }, [ activityStore ] );

  if ( activityStore.loadingInitial ) return <LoadingComponent content="Loading app" />;

  return (
    <>
      <NavBar />
      <Container style={ { marginTop: "7rem" } }>
        <ActivityDashboard />
      </Container>
    </>
  );
}

export default observer( App );