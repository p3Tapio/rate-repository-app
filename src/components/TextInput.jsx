import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    inputField: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 5,
        margin: 5,
        marginBottom: 19,
        marginTop: 10,
        height: 40,
        padding: 10
    },
    inputFieldError: {
        backgroundColor: '#fefafd',
        borderWidth: 1,
        borderColor: 'red',
        borderRadius: 5,
        margin: 5,
        marginBottom: 0,
        marginTop: 10,
        height: 40,
        padding: 10
    },
});

const TextInput = ({ error, ...props }) => {

    const textInputStyle = [
        error ? styles.inputFieldError : styles.inputField
    ];
    return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;