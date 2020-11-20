/* eslint-disable jest/expect-expect */
import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import { Formik } from 'formik';
import { LoginForm } from '../../components/SignIn';

describe('SignIn', () => {
    describe('SignInContainer', () => {
        it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
            const onSubmit = jest.fn();
            const { getByTestId } = render(
                <Formik onSubmit={onSubmit} initialValues={{ username: '', password: '' }}>
                    {({ handleSubmit }) => <LoginForm onSubmit={handleSubmit} />}
                </Formik>
            );

            fireEvent.changeText(getByTestId('username'), 'Jorma');
            fireEvent.changeText(getByTestId('password'), 'salasana');
            fireEvent.press(getByTestId('submit'));

            await waitFor(() => {
                expect(onSubmit).toHaveBeenCalledTimes(1);
                expect(onSubmit.mock.calls[0][0]).toEqual({
                    username: 'Jorma',
                    password: 'salasana',
                });
            });
        });
    });
});