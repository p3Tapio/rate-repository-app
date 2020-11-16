import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
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
            <TouchableWithoutFeedback>  
                <Text fontSize="subheading" fontWeight="bold" color="white" style={{margin:10}}>
                    Repositories
                </Text>
            </TouchableWithoutFeedback>     
        </View>
    );
};

export default AppBar;