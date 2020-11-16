import React, { useState } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
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

    const onSubmit = (values) => {
        console.log('values:', values);
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