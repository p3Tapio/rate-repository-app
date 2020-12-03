import React from 'react';
import { useParams } from 'react-router-native';
import useRepoDetails from '../hooks/useRepoDetails';

import { View, FlatList } from 'react-native';
import Text from './Text';
import { containerStyles } from '../theme';

import RepositoryItem from './RepositoryItem';
import {dateFormat} from '../utils/dateFormat';

const ItemSeparator = () => <View />;


export const ReviewItem = ({ review }) => {
    
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
    const { data, loading, fetchMore } = useRepoDetails({id:id, first:7});
 
    const onEndReact = () => {
        console.log('END');
        fetchMore(); 
    }; 

    if (loading && !data) return null;
    const reviews = data ? data.repository.reviews.edges.map(x => x.node) : [];

    return (
        <FlatList
            data={reviews}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item }) => <ReviewItem review={item} />}
            keyExtractor={({ id }) => id}
            ListHeaderComponent={() => <RepositoryItem item={data.repository} />}
            onEndReached={onEndReact}
            onEndReachedThreshold={0.5}
        />
    );
};

export default SingleRepository;
