import { ErrorMessage, Form, Formik } from "formik";
import { Button, Header } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import * as Yup from "yup";
//hooks
import { useStore } from "../../app/stores/store";
//components
import MyTextInput from "../../app/common/form/MyTextInput";
import ValidationError from "../errors/ValidationError";


const RegisterForm = () =>
{
    const { userStore } = useStore();

    return (
        <Formik
            initialValues={ { displayName: "", username: "", email: "", password: "", error: null } }
            onSubmit={ ( values, { setErrors } ) => userStore.register( values ).catch( error =>
                setErrors( { error } ) ) }
            validationSchema={ Yup.object(
                {
                    displayName: Yup.string().required(),
                    username: Yup.string().required(),
                    email: Yup.string().required().email(),
                    password: Yup.string().required()
                } ) }
        >
            { ( { handleSubmit, isSubmitting, errors, isValid, dirty } ) =>
            (
                <Form className="ui form error" onSubmit={ handleSubmit } autoComplete="off">
                    <Header as="h2" content="Sign up to Reactivities" color="teal" textAlign="center" />
                    <MyTextInput placeholder="Display Name" name="displayName" />
                    <MyTextInput placeholder="Username" name="username" />
                    <MyTextInput placeholder="Email" name="email" />
                    <MyTextInput placeholder="Password" name="password" type="password" />
                    <ErrorMessage
                        name="error" render={ () => <ValidationError errors={ errors } /> }
                    />
                    <Button
                        disabled={ !isValid || !dirty || isSubmitting }
                        loading={ isSubmitting }
                        positive content="Login"
                        type="submit" fluid
                    />
                </Form>
            ) }
        </Formik>
    );
};

export default observer( RegisterForm );