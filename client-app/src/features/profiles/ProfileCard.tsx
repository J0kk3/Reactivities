import { Link } from "react-router-dom";
import { Image, Card, CardContent, Icon } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
//types
import { Profile } from "../../app/models/profile";

interface Props
{
    profile: Profile;
}

const ProfileCard = ( { profile }: Props ) =>
{
    return (
        <Card as={ Link } to={ `/profiles/${ profile.username }` }>
            <Image src={ profile.image || "/assets/user.png" } />
            <Card.Content>
                <Card.Header>{ profile.displayName }</Card.Header>
                <Card.Description>Bio goes here</Card.Description>
            </Card.Content>
            <CardContent extra>
                <Icon name="user">
                    20 followers
                </Icon>
            </CardContent>
        </Card>
    );
};

export default observer( ProfileCard );