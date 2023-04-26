import { Tab } from "semantic-ui-react";
//types
import { Profile } from "../../app/models/profile";
//components
import ProfilePhotos from "./ProfilePhotos";
import { observable } from "mobx";

interface Props
{
    profile: Profile;
}

const ProfileContent = ( { profile }: Props ) =>
{
    const panes =
        [
            { menuItem: "About", render: () => <Tab.Pane>About content</Tab.Pane> },
            { menuItem: "Photos", render: () => <ProfilePhotos profile={ profile } /> },
            { menuItem: "Events", render: () => <Tab.Pane>Events content</Tab.Pane> },
            { menuItem: "Followers", render: () => <Tab.Pane>Followers content</Tab.Pane> },
            { menuItem: "Following", render: () => <Tab.Pane>Following content</Tab.Pane> },
        ];

    return (
        <Tab
            menu={ { fluid: true, vertical: true } }
            menuPosition="right"
            panes={ panes }
        />
    );
};

export default observable( ProfileContent );