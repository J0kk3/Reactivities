import { useParams } from "react-router-dom";
import { useEffect } from 'react';
import { Grid } from "semantic-ui-react";
import { observable } from "mobx";
import LoadingComponent from "../../app/layout/LoadingComponent";
//store
import { useStore } from "../../app/stores/store";
//components
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";

const ProfilePage = () =>
{
    const { username } = useParams<{ username: string; }>();
    const { profileStore } = useStore();
    const { loadingProfile, loadProfile, profile } = profileStore;

    useEffect( () =>
    {
        if ( username )
            loadProfile( username );
    }, [ loadProfile, username ] );

    if ( loadingProfile ) return <LoadingComponent content="Loading Profile..." />;

    return (
        <Grid>
            <Grid.Column width={ 16 }>
                { profile &&
                    <>
                        <ProfileHeader profile={ profile } />
                        <ProfileContent profile={ profile } />
                    </> }
            </Grid.Column>
        </Grid>
    );
};

export default observable( ProfilePage );;