import React from 'react';
import Constants from 'expo-constants';
import { Text, StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';

const styles = StyleSheet.create({
    container: {
        marginTop: Constants.statusBarHeight,
        padding: 15,
        flexGrow: 1,
        flexShrink: 1,
    }
});

const Main = () => {
    return (
        <View style={styles.container} >
            <Text style={{marginBottom: 10, fontWeight:'bold'}}>Rate Repository Application</Text>
            <RepositoryList />
        </View>
    );
};

export default Main; 