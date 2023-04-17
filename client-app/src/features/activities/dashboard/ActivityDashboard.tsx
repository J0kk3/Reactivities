import { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
//hooks
import { useStore } from "../../../app/stores/store";
//components
import ActivityList from "./ActivityList";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import ActivityFilters from "./ActivityFilters";

const ActivityDashboard = () =>
{
    const { activityStore } = useStore();
    const { loadActivities, activityRegistry } = activityStore;

    useEffect( () =>
    {
        if ( activityRegistry.size <= 0 ) loadActivities();
    }, [ loadActivities, activityRegistry.size ] );

    if ( activityStore.loadingInitial ) return <LoadingComponent content="Loading app" />;

    return (
        <Grid>
            <Grid.Column width={ 10 }>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width={ 6 }>
                <ActivityFilters />
            </Grid.Column>
        </Grid>
    );
};

export default observer( ActivityDashboard );