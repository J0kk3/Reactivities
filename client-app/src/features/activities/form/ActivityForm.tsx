import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Segment, Button, Header } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { v4 as uuid } from "uuid";
import { Formik, Form } from "formik";
import * as Yup from "yup";
//hooks
import { useStore } from "../../../app/stores/store";
//types
import { Activity } from "../../../app/models/activity";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
//components
import LoadingComponent from "../../../app/layout/LoadingComponent";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import MyDateInput from "../../../app/common/form/MyDateInput";

const ActivityForm = () =>
{
    const { activityStore } = useStore();
    const { createActivity, updateActivity,
        loading, loadActivity, loadingInitial } = activityStore;

    const { id } = useParams<{ id: string; }>();
    const navigate = useNavigate();

    const [ activity, setActivity ] = useState<Activity>(
        {
            id: "",
            title: "",
            category: "",
            description: "",
            date: null,
            city: "",
            venue: ""
        } );

    const validationSchema = Yup.object(
        {
            title: Yup.string().required( "The activity title is required" ),
            category: Yup.string().required( "The activity category is required" ),
            description: Yup.string().required( "The activity description is required" ),
            date: Yup.string().required( "The activity date is required" ).nullable(),
            city: Yup.string().required( "The activity city is required" ),
            venue: Yup.string().required( "The activity venue is required" )
        }
    );

    useEffect( () =>
    {
        if ( id ) loadActivity( id ).then( activity => setActivity( activity! ) );
    }, [ id, loadActivity ] );

    const handleFormSubmit = ( activity: Activity ) =>
    {
        if ( activity.id.length === 0 )
        {
            let newActivity =
            {
                ...activity,
                id: uuid()
            };
            createActivity( newActivity ).then( () => navigate( `/activities/${ newActivity.id }` ) );
        } else
        {
            updateActivity( activity ).then( () => navigate( `/activities/${ activity.id }` ) );
        }
    };

    if ( loadingInitial ) return <LoadingComponent content="Loading Activity..." />;

    return (
        <Segment clearing>
            <Header content="Activity Details" sub color="teal" />
            <Formik
                validationSchema={ validationSchema }
                enableReinitialize
                initialValues={ activity }
                onSubmit={ values => handleFormSubmit( values ) }
            >
                { ( { handleSubmit, isValid, isSubmitting, dirty } ) => (
                    <Form className="ui form" onSubmit={ handleSubmit } autoComplete="off">
                        <MyTextInput name="title" placeholder="Title" />
                        <MyTextArea rows={ 3 } placeholder="Description" name="description" />
                        <MySelectInput options={ categoryOptions } placeholder="Category" name="category" />
                        <MyDateInput
                            placeholderText="Date"
                            name="date"
                            showTimeSelect
                            timeCaption="time"
                            // dateFormat="MMMM d, yyyy HH:mm"
                            dateFormat="dd-MM-yyyy-HH:mm"
                        />
                        <Header content="Location Details" sub color="teal" />
                        <MyTextInput placeholder="City" name="city" />
                        <MyTextInput placeholder="Venue" name="venue" />
                        <Button
                            disabled={ isSubmitting || !dirty || !isValid }
                            loading={ loading } floated="right"
                            positive type="submit" content="Submit"
                        />
                        <Button as={ Link } to="/activities" floated="right" type="button" content="Cancel" />
                    </Form>
                ) }
            </Formik>
        </Segment>
    );
};

export default observer( ActivityForm );