import React from 'react';
import { View, Image, TouchableWithoutFeedback } from 'react-native';
import Text from './Text';
import { containerStyles, buttonStyles } from '../theme';
import * as WebBrowser from 'expo-web-browser';

const rounder = (x) => {
    const y = x / 1000;
    return (Math.round(y * 10) / 10) + 'k';
};

const RepoHeadElement = ({ item }) => { 
    return (
        <View style={{ flexDirection: 'row' }}>
            <Image source={{ uri: item.ownerAvatarUrl }} style={containerStyles.repoAvatar}></Image>
            <View style={containerStyles.headContainer}>
                <Text fontWeight="bold" testID="repoFullname">{item.fullName}</Text>
                <Text testID="repoDescription">{item.description}</Text>
                <View style={{ alignSelf: 'flex-start' }}>
                    <Text textEffect='language' testID="repoLanguage">{item.language}</Text>
                </View>
            </View>
        </View>
    );
};

const RepoStats = ({ item }) => {
    return (
        <View style={containerStyles.statsContainer}>
            <View style={{ marginHorizontal: 10 }}>
                <Text fontSize="small" fontWeight="bold" testID="repoStars">{item.stargazersCount > 1000 ? rounder(item.stargazersCount) : item.stargazersCount}</Text>
                <Text fontSize="small">Stars</Text>
            </View>
            <View style={{ marginHorizontal: 10 }}>
                <Text fontSize="small" fontWeight="bold" testID="repoForks">{item.forksCount > 1000 ? rounder(item.forksCount) : item.forksCount}</Text>
                <Text fontSize="small">Forks</Text>
            </View>
            <View style={{ marginHorizontal: 10 }}>
                <Text fontSize="small" fontWeight="bold" testID="repoReviews">{item.reviewCount}</Text>
                <Text fontSize="small">Reviews</Text>
            </View>
            <View style={{ marginHorizontal: 10 }}>
                <Text fontSize="small" fontWeight="bold" testID="repoRating">{item.ratingAverage}</Text>
                <Text fontSize="small">Rating</Text>
            </View>
        </View>
    );
};
const RepoBtn = ({ url }) => {
  
    return (
        <TouchableWithoutFeedback onPress={() => WebBrowser.openBrowserAsync(url)}>
            <Text style={buttonStyles.linkToGit}>Open in GitHub</Text>
        </TouchableWithoutFeedback>
    );
};

const RepositoryItem = ({ item }) => {

    return (
        <View style={containerStyles.mainCardContainer}>
            <RepoHeadElement item={item} />
            <RepoStats item={item} />
            {item.url ? <RepoBtn url={item.url} /> : <></>}
        </View>
    );
};

export default RepositoryItem;