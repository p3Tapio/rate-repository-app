import React from 'react';
import { Route, Switch, Redirect } from 'react-router-native';
import { View, StyleSheet } from 'react-native';
import theme from '../theme';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import SingleRepository from './SingleRepository';

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.mainBackground,
        flexGrow: 1,
        flexShrink: 1,
    },
});

const Main = () => {
    return (
        <View style={styles.container}>
            <AppBar />
            <Switch>
                <Route path="/" exact>
                    <RepositoryList />
                </Route>
                <Route path="/signin">
                    <SignIn />
                </Route>
                <Route path="/repoitem/:id">
                    <SingleRepository />
                </Route>
                <Redirect to="/" />
            </Switch>
        </View>
    );
};

export default Main; 