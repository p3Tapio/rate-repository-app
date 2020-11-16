import React from 'react';
import { Text as NativeText, StyleSheet } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
    text: {
        color: theme.colors.textPrimary,
        fontSize: theme.fontSizes.body,
        fontFamily: theme.fonts.main,
        fontWeight: theme.fontWeights.normal,
    },
    colorTextSecondary: { color: theme.colors.textSecondary, },
    colorTextWhite: { color: theme.colors.textWhite },
    colorPrimary: { color: theme.colors.primary },
    fontSizeHeading: { fontSize: theme.fontSizes.heading, },
    fontSizeSubheading: { fontSize: theme.fontSizes.subheading, },
    fontSizeSmall: { fontSize: theme.fontSizes.small },
    fontWeightBold: { fontWeight: theme.fontWeights.bold, },
    languageTextStyle: {
        fontSize: theme.fontSizes.small,
        color: theme.colors.textWhite,
        backgroundColor: theme.colors.languageBackground,
        borderRadius: 5,
        padding: 5,
        marginTop: 5,
    },

});

const Text = ({ color, fontSize, fontWeight, style, textEffect, ...props }) => {
    const textStyle = [
        styles.text,
        color === 'textSecondary' && styles.colorTextSecondary,
        color === 'primary' && styles.colorPrimary,
        color === 'white' && styles.colorTextWhite,
        textEffect === 'language' && styles.languageTextStyle,
        fontSize === 'subheading' && styles.fontSizeSubheading,
        fontSize === 'heading' && styles.fontSizeHeading,
        fontSize === 'small' && styles.fontSizeSmall,
        fontWeight === 'bold' && styles.fontWeightBold,
        style,
    ];
    return <NativeText style={textStyle} {...props} />;
};

export default Text;