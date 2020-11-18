import React, { useState } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import useSignIn from '../hooks/useSignIn';
import AuthStorage from '../utils/authStorage';

import { Formik } from 'formik';
import * as yup from 'yup';

import FormikTextInput from './FormikTextInput';
import Text from './Text';
import { containerStyles, buttonStyles } from '../theme';

const initialValues = {
    username: '',
    password: ''
};

const SignIn = () => {

    const [signIn] = useSignIn();

    const onSubmit = async (values) => {
        const { username, password } = values;
        const user = new AuthStorage('user');

        try {
            const { data } = await signIn({ username, password });
            console.log(data.authorize.accessToken);
            await user.setAccessToken(data.authorize.accessToken);
        } catch (e) {
            console.log(e);
        }

        values.username = '';
        values.password = '';
    };
    const validationSchema = yup.object().shape({
        password: yup.string().required('Password is required!'),
        username: yup.string().required('Username is required!'),
    });

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {({ handleSubmit }) => <LoginForm onSubmit={handleSubmit} />}
        </Formik>
    );
};

const LoginForm = ({ onSubmit }) => {
    const [signinStyle, setSigninStyle] = useState(buttonStyles.submit);

    const handleSubmit = () => {
        onSubmit();
        setSigninStyle(buttonStyles.submitPressed);
        setTimeout(() => {
            setSigninStyle(buttonStyles.submit);
        }, 300);
    };
    return (
        <View style={{ margin: 20 }}>
            <View style={containerStyles.mainCardContainer}>
                <FormikTextInput name="username" placeholder="Username" />
                <FormikTextInput name="password" placeholder="Password" secureTextEntry={true} />
                <TouchableWithoutFeedback onPress={handleSubmit} >
                    <Text style={signinStyle}>Sign in</Text>
                </TouchableWithoutFeedback>
            </View>
        </View>
    );
};

export default SignIn;