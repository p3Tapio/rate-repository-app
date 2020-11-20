import React, { useState } from 'react';
import { TouchableWithoutFeedback, View, Alert } from 'react-native';
import useSignIn from '../hooks/useSignIn';

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

        try {
            await signIn({ username, password });
        } catch (e) {
            Alert.alert(e.graphQLErrors[0].message);
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

export const LoginForm = ({ onSubmit }) => {

    return (
        <View style={{ margin: 20 }}>
            <View style={containerStyles.mainCardContainer}>
                <FormikTextInput name="username" placeholder="Username" testID="username" />
                <FormikTextInput name="password" placeholder="Password" secureTextEntry={true} testID="password" />
                <TouchableWithoutFeedback onPress={onSubmit} testID="submit">
                    <Text style={buttonStyles.submit}>Sign in</Text>
                </TouchableWithoutFeedback>
            </View>
        </View>
    );
};

export default SignIn;



// const [signinStyle, setSigninStyle] = useState(buttonStyles.submit);

// const handleSubmit = () => {
//     onSubmit();
//     setSigninStyle(buttonStyles.submitPressed);
//     setTimeout(() => {
//         setSigninStyle(buttonStyles.submit);
//     }, 300);
// };