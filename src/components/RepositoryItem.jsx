import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Text from './Text';

const repoContainerStyles = StyleSheet.create({
    mainCardContainer: {
        borderRadius: 15,
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
});

const rounder = (x) => {
    const y = x / 1000;
    return (Math.round(y * 10) / 10) + 'k';
};

const RepoHeadElement = ({ item }) => {
    return (
        <View style={{ flexDirection: 'row' }}>
            <Image source={{ uri: item.ownerAvatarUrl }} style={repoContainerStyles.repoAvatar}></Image>
            <View style={repoContainerStyles.headContainer}>
                <Text fontWeight="bold">{item.fullName}</Text>
                <Text>{item.description}</Text>
                <View style={{ alignSelf: 'flex-start' }}>
                    <Text textEffect='language'>{item.language}</Text>
                </View>
            </View>
        </View>
    );
};

const RepoStats = ({ item }) => {
    return (
        <View style={repoContainerStyles.statsContainer}>
            <View style={{ marginHorizontal: 10 }}>
                <Text fontSize="small" fontWeight="bold">{item.stargazersCount > 1000 ? rounder(item.stargazersCount) : item.stargazersCount}</Text>
                <Text fontSize="small">Stars</Text>
            </View>
            <View style={{ marginHorizontal: 10 }}>
                <Text fontSize="small" fontWeight="bold">{item.forksCount > 1000 ? rounder(item.forksCount) : item.forksCount}</Text>
                <Text fontSize="small">Forks</Text>
            </View>
            <View style={{ marginHorizontal: 10 }}>
                <Text fontSize="small" fontWeight="bold">{item.reviewCount}</Text>
                <Text fontSize="small">Reviews</Text>
            </View>
            <View style={{ marginHorizontal: 10 }}>
                <Text fontSize="small" fontWeight="bold">{item.ratingAverage}</Text>
                <Text fontSize="small">Rating</Text>
            </View>
        </View>
    );
};

const RepositoryItem = ({ item }) => (
    <View style={repoContainerStyles.mainCardContainer}>
        <RepoHeadElement item={item} />
        <RepoStats item={item} />
    </View>
);

export default RepositoryItem;