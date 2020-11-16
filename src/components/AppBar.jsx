import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { Link } from 'react-router-native';

import Text from './Text';
import Constants from 'expo-constants';
import theme from '../theme';


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
    return (
        <View style={styles.container}>
            <ScrollView horizontal>
                <Link to="/signin" component={TouchableWithoutFeedback}>
                    <Text fontSize="subheading" fontWeight="bold" color="white" style={{ margin: 5 }}>
                        Sign in
                    </Text>
                </Link>
                <Link to="/" component={TouchableWithoutFeedback}>
                    <Text fontSize="subheading" fontWeight="bold" color="white" style={{ margin: 5 }}>
                        Repositories
                    </Text>
                </Link>
            </ScrollView>
        </View>
    );
};

export default AppBar;