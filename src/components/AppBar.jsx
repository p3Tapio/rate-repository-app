import React, { useContext } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { Link, useHistory } from 'react-router-native';

import Text from './Text';
import Constants from 'expo-constants';
import theme from '../theme';

import { useQuery } from '@apollo/react-hooks';
import { GET_USER } from '../graphql/queries';
import AuthStorageContext from '../contexts/AuthStorageContext';
import { useApolloClient } from '@apollo/client';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: theme.colors.appBarBackgroud,
        height: 80,
        alignItems: 'flex-end',
        justifyContent: 'flex-start'
    },
});

const AppBar = () => {
    const { data } = useQuery(GET_USER);
    const authStorage = useContext(AuthStorageContext);
    const client = useApolloClient();
    const history = useHistory();

    const handleLogout = async () => {
        await authStorage.removeAccessToken();
        await client.resetStore();
        history.push('/');
    };

    if (!data) return null;
    return (
        <View style={styles.container}>
            <ScrollView horizontal>
                <Link to="/" component={TouchableWithoutFeedback}>
                    <Text fontSize="subheading" fontWeight="bold" color="white" style={{ margin: 5 }}>
                        Repositories
                    </Text>
                </Link>
                {data.authorizedUser !== null
                    ? <>
                        <Link to="/review" component={TouchableWithoutFeedback}>
                            <Text fontSize="subheading" fontWeight="bold" color="white" style={{ margin: 5 }}>
                                Create a review
                            </Text>
                        </Link>
                        <Link to="/myreviews" component={TouchableWithoutFeedback}>
                            <Text fontSize="subheading" fontWeight="bold" color="white" style={{ margin: 5 }}>
                                My reviews
                            </Text>
                        </Link>
                        <TouchableWithoutFeedback onPress={handleLogout}>
                            <Text fontSize="subheading" fontWeight="bold" color="white" style={{ margin: 5 }}>
                                Sign out
                            </Text>
                        </TouchableWithoutFeedback>
                    </>
                    : <>
                        <Link to="/signin" component={TouchableWithoutFeedback}>
                            <Text fontSize="subheading" fontWeight="bold" color="white" style={{ margin: 5 }}>
                                Sign in
                            </Text>
                        </Link>
                        <Link to="/signup" component={TouchableWithoutFeedback}>
                            <Text fontSize="subheading" fontWeight="bold" color="white" style={{ margin: 5 }}>
                                Sign up
                            </Text>
                        </Link>
                    </>
                }
            </ScrollView>
        </View>
    );
};

export default AppBar;