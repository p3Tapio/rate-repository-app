import React from 'react';
import { View, Image } from 'react-native';
import Text from './Text';
import { containerStyles } from '../theme';

const rounder = (x) => {
    const y = x / 1000;
    return (Math.round(y * 10) / 10) + 'k';
};

const RepoHeadElement = ({ item }) => {
    return (
        <View style={{ flexDirection: 'row' }}>
            <Image source={{ uri: item.ownerAvatarUrl }} style={containerStyles.repoAvatar}></Image>
            <View style={containerStyles.headContainer}>
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
        <View style={containerStyles.statsContainer}>
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
    <View style={containerStyles.mainCardContainer}>
        <RepoHeadElement item={item} />
        <RepoStats item={item} />
    </View>
);

export default RepositoryItem;