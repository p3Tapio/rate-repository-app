import React from 'react';
import { TouchableWithoutFeedback, View, Alert } from 'react-native';
import useSignIn from '../hooks/useSignIn';
import useSignUp from '../hooks/useSignUp';

import { Formik } from 'formik';
import * as yup from 'yup';

import FormikTextInput from './FormikTextInput';
import Text from './Text';
import { containerStyles, buttonStyles } from '../theme';


const initialValues = { username: '', password: '', passwordConfirmation: '' };

const SignUp = () => {

    const [signIn] = useSignIn();
    const [signUp] = useSignUp();

    const onSubmit = async (values) => {
        const { username, password } = values;
        try {
            await signUp({ username, password });
            await signIn({ username, password });
        } catch (e) {
            console.log(e);
            Alert.alert(e.graphQLErrors[0].message);
        }
    };
    const validationSchema = yup.object().shape({
        password: yup.string().min(5).max(50).required('Password is required'),
        username: yup.string().min(1).max(30).required('Username is required'),
        passwordConfirmation: yup.string()
            .oneOf([yup.ref('password')], 'Passwords do not match')
            .required('Password confirmation is required'),
    });

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
        </Formik>
    );
};

const SignUpForm = ({ onSubmit }) => {
    return (
        <View style={{ margin: 20 }}>
            <View style={containerStyles.mainCardContainer}>
                <FormikTextInput name="username" placeholder="Username" />
                <FormikTextInput name="password" placeholder="Password" secureTextEntry={true} />
                <FormikTextInput name="passwordConfirmation" placeholder="Password confirmation" secureTextEntry={true} />
                <TouchableWithoutFeedback onPress={onSubmit} >
                    <Text style={buttonStyles.submit}>Sign up</Text>
                </TouchableWithoutFeedback>
            </View>
        </View>
    );
};

export default SignUp;
