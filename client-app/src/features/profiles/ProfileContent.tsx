import { Tab } from "semantic-ui-react";
//types
import { Profile } from "../../app/models/profile";
//stores
import { useStore } from "../../app/stores/store";
//components
import ProfilePhotos from "./ProfilePhotos";
import { observable } from "mobx";
import ProfileFollowings from "./ProfileFollowings";
import ProfileActivities from "./ProfileActivities";
import ProfileAbout from "./ProfileAbout";

interface Props
{
    profile: Profile;
}

const ProfileContent = ( { profile }: Props ) =>
{
    const { profileStore } = useStore();

    const panes =
        [
            { menuItem: "About", render: () => <ProfileAbout /> },
            { menuItem: "Photos", render: () => <ProfilePhotos profile={ profile } /> },
            { menuItem: "Events", render: () => <ProfileActivities /> },
            { menuItem: "Followers", render: () => <ProfileFollowings /> },
            { menuItem: "Following", render: () => <ProfileFollowings /> },
        ];

    return (
        <Tab
            menu={ { fluid: true, vertical: true } }
            menuPosition="right"
            panes={ panes }
            onTabChange={ ( e, data ) => profileStore.setActiveTab( data.activeIndex ) }
        />
    );
};

export default observable( ProfileContent );