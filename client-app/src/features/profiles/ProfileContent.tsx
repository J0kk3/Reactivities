import { Tab } from "semantic-ui-react";
//types
import { Profile } from "../../app/models/profile";
//components
import ProfilePhotos from "./ProfilePhotos";
import { observable } from "mobx";
import ProfileFollowings from "./ProfileFollowings";
//stores
import { useStore } from "../../app/stores/store";

interface Props
{
    profile: Profile;
}

const ProfileContent = ( { profile }: Props ) =>
{
    const { profileStore } = useStore();

    const panes =
        [
            { menuItem: "About", render: () => <Tab.Pane>About content</Tab.Pane> },
            { menuItem: "Photos", render: () => <ProfilePhotos profile={ profile } /> },
            { menuItem: "Events", render: () => <Tab.Pane>Events content</Tab.Pane> },
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