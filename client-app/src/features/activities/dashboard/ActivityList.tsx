import { Fragment } from "react";
import { Header } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
//hooks
import { useStore } from "../../../app/stores/store";
//components
import ActivityListItem from "./ActivityListItem";

const ActivityList = () =>
{
    const { activityStore } = useStore();
    const { groupedActivities } = activityStore;


    return (
        <>
            { groupedActivities.map( ( [ group, activities ] ) => (
                <Fragment key={ group }>
                    <Header sub color="teal">
                        { group }
                    </Header>
                    { activities.map( activity => (
                        <ActivityListItem key={ activity.id } activity={ activity } />
                    ) ) }
                </Fragment>
            ) ) }
        </>
    );
};

export default observer( ActivityList );