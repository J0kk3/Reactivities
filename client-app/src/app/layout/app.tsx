import { useState, useEffect } from "react";
import { Container } from "semantic-ui-react";
import axios from "axios";
import { v4 as uuid } from "uuid";
//types
import { Activity } from "../models/activity";
//components
import NavBar from './NavBar';
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

function App ()
{
  const [ activities, setActivities ] = useState<Activity[]>( [] );
  const [ selectedActivity, setSelectedActivity ] = useState<Activity | undefined>( undefined );
  const [ editMode, setEditMode ] = useState( false );

  useEffect( () =>
  {
    axios.get<Activity[]>( "http://localhost:5000/api/activities" )
      .then( res =>
      {
        setActivities( res.data );
      } );
  }, [] );

  const handleSelectActivity = ( id: string ) =>
  {
    setSelectedActivity( activities.find( x => x.id === id ) );
  };

  const handleCancelSelectActivity = () =>
  {
    setSelectedActivity( undefined );
  };

  const handleFormOpen = ( id?: string ) =>
  {
    id ? handleSelectActivity( id ) : handleCancelSelectActivity();
    setEditMode( true );
  };

  const handleFormClose = () =>
  {
    setEditMode( false );
  };

  const handleCreateOrEditActivity = ( activity: Activity ) =>
  {
    activity.id
      ? setActivities( [ ...activities.filter( x => x.id !== activity.id ), activity ] )
      : setActivities( [ ...activities, { ...activity, id: uuid() } ] );
    setEditMode( false );
    setSelectedActivity( activity );
  };

  const handleDeleteActivity = ( id: string ) =>
  {
    setActivities( [ ...activities.filter( x => x.id !== id ) ] );
  };

  return (
    <>
      <NavBar openForm={ handleFormOpen } />
      <Container style={ { marginTop: "7rem" } }>
        <ActivityDashboard
          activities={ activities }
          selectedActivity={ selectedActivity }
          selectActivity={ handleSelectActivity }
          cancelSelectActivity={ handleCancelSelectActivity }
          editMode={ editMode }
          openForm={ handleFormOpen }
          closeForm={ handleFormClose }
          createOrEdit={ handleCreateOrEditActivity }
          deleteActivity={ handleDeleteActivity }
        />
      </Container>
    </>
  );
}

export default App;