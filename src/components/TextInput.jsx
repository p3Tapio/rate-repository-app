import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    inputField: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 5,
        margin: 2,
        height: 40,
        padding: 10
    },
});

const TextInput = ({ ...props }) => {
    const textInputStyle = [
        styles.inputField
    ];
    return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;