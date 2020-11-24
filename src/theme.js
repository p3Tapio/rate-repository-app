import { Platform, StyleSheet } from 'react-native';

const theme = {
    colors: {
        textPrimary: '#24292e',
        textSecondary: '#586069',
        textWhite: '#fff',
        primary: '#0366d6',
        appBarBackgroud: '#24292e',
        mainBackground: '#91A6BA',
        languageBackground: '#3B5B7A',
    },
    fontSizes: { body: 15, heading: 25, subheading: 16, small: 11 },
    fonts: {
        main: Platform.select({
            android: 'Roboto',
            ios: 'Arial',
            default: 'System',
        }),
    },
    fontWeights: { normal: '400', bold: '700', },
};

export const containerStyles = StyleSheet.create({
    mainCardContainer: {
        borderRadius: 12,
        padding: 15,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'lightgray',
        margin: 5,

        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
    },
    headContainer: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 10,
    },
    statsContainer: {
        flexDirection: 'row',
        marginHorizontal: 50,
        marginTop: 5,
    },
    repoAvatar: {
        width: 50,
        height: 50,
        borderRadius: 5,
        marginTop: 5
    },
    reviewRating: {
        width: 60, 
        height: 60,
        borderRadius: 30,
        borderWidth: 5,
        borderColor: theme.colors.appBarBackgroud,
        color: theme.colors.appBarBackgroud,
        paddingTop: 18,
        padding: 10,
        textAlign: 'center',
        margin: 5,
    }
});
export const buttonStyles = StyleSheet.create({
    submit: {
        backgroundColor: theme.colors.appBarBackgroud,
        color: theme.colors.textWhite,
        borderColor: '#2f363c',
        borderWidth: 2,
        borderRadius: 5,
        padding: 7,
        width: 80,
        fontSize: theme.fontSizes.small,
        // alignSelf: 'center',
        textAlign: 'center',
        marginLeft: 3,
        marginTop: 10,

        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
    },
    submitPressed: {
        backgroundColor: '#2f363c',
        color: theme.colors.textWhite,
        borderColor: '#464F59',
        borderWidth: 2,
        borderRadius: 7,
        padding: 7,
        width: 80,
        fontSize: theme.fontSizes.small,
        // alignSelf: 'center',
        textAlign: 'center',
        marginLeft: 4,
        marginTop: 10,

        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
    },
    linkToGit: {
        backgroundColor: theme.colors.appBarBackgroud,
        color: theme.colors.textWhite,
        alignSelf:'center',
        textAlign: 'center',
        borderColor: '#2f363c',
        borderWidth: 2,
        borderRadius: 7,
        padding: 7,
        marginTop:15,
        width: 330
    }
});

export default theme; 