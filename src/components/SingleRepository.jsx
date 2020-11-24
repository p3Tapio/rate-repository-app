import React from 'react';
import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/react-hooks';
import { GET_REPO_DETAILS } from '../graphql/queries';

import { View, FlatList } from 'react-native';
import Text from './Text';
import { containerStyles } from '../theme';

import RepositoryItem from './RepositoryItem';

const ItemSeparator = () => <View />;
const dateFormat = (x) => {
    const date = new Date(x);
    const dd = date.getDate();
    const mm = date.getMonth() + 1;
    const yyyy = date.getFullYear();

    return `${dd}.${mm}.${yyyy}`;
};

const ReviewItem = ({ review }) => {
    
    return (
        <View style={containerStyles.mainCardContainer}>
            <View style={{ flexDirection: 'row' }}>
                <Text fontWeight="bold" style={containerStyles.reviewRating}>{review.rating}</Text>
                <View style={containerStyles.headContainer}>
                    <Text fontWeight="bold">{review.user.username}</Text>
                    <Text fontSize="small">{dateFormat(review.createdAt)}</Text>
                    <Text>{review.text}</Text>
                </View>
            </View>
        </View>
    );
};

const SingleRepository = () => {
    const { id } = useParams();
    const { data, loading } = useQuery(GET_REPO_DETAILS, {
        variables: { id: id },
        fetchPolicy: 'cache-and-network'
    });

    if (loading) return null;
    const reviews = data ? data.repository.reviews.edges.map(x => x.node) : [];

    return (
        <FlatList
            data={reviews}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item }) => <ReviewItem review={item} />}
            keyExtractor={({ id }) => id}
            ListHeaderComponent={() => <RepositoryItem item={data.repository} />}
        />
    );
};

export default SingleRepository;
