import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';

import { Formik } from 'formik';
import * as yup from 'yup';

import FormikTextInput from './FormikTextInput';
import Text from './Text';
import { containerStyles, buttonStyles } from '../theme';

import useReview from '../hooks/useReview';
import { useHistory } from 'react-router-native';

const initialValues = { repositoryName: '', ownerName: '', rating: '', text: '' };

const CreateReview = () => {

    const [review] = useReview();
    const history = useHistory();

    const onSubmit = async (values) => {
        try {
            const { repositoryName, ownerName, rating, text } = values;
            const { res } = await review({ repositoryName, ownerName, rating, text });
            history.push(`/repoitem/${res.data.createReview.repository.id}`);
        } catch (errr) {
            console.log(errr);
        }
    };
    const validationSchema = yup.object().shape({
        ownerName: yup.string().required('Repository owner name is required'),
        repositoryName: yup.string().required('Repository name is required'),
        rating: yup.number().min(0).max(100).required('Rating is required')
    });

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
        </Formik>

    );
};
const ReviewForm = ({ onSubmit }) => {
    return (
        <View style={{ margin: 20 }}>
            <View style={containerStyles.mainCardContainer}>
                <FormikTextInput name="ownerName" placeholder="Repository owner name" />
                <FormikTextInput name="repositoryName" placeholder="Repository name" />
                <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
                <FormikTextInput multiline={true} name="text" placeholder="Review" />
                <TouchableWithoutFeedback onPress={onSubmit}>
                    <Text style={buttonStyles.linkToGit}>Create review</Text>
                </TouchableWithoutFeedback>
            </View>
        </View>
    );
};

export default CreateReview;
