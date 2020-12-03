import React from 'react';
import { FlatList, View, TouchableOpacity, Alert } from 'react-native';
import Text from './Text';
import { buttonStyles, containerStyles } from '../theme';

import { useMutation, useQuery } from '@apollo/react-hooks';
import { GET_USER } from '../graphql/queries';
import { DELETE_REVIEW } from '../graphql/mutations';
import { dateFormat } from '../utils/dateFormat';
import { useHistory } from 'react-router-native';

const ReviewItem = ({ review }) => {

    const history = useHistory();
    const [mutate] = useMutation(DELETE_REVIEW);

    const handleDeleteClick = async (id) => {
        Alert.alert('Delete review', 'Are you sure you want to delete this review?',
            [
                { text: 'Cancel', },
                {
                    text: 'Delete', onPress: () => {
                        mutate({
                            variables: {id},
                            refetchQueries: [{ query: GET_USER, variables: { includeReviews: true }, }],
                            awaitRefetchQueries: true,
                        });                    
                    }
                }
            ]
        );
    };

    return (
        <View style={containerStyles.mainCardContainer}>
            <View style={{ flexDirection: 'row' }}>
                <Text fontWeight="bold" style={containerStyles.reviewRating}>{review.rating}</Text>
                <View style={containerStyles.headContainer}>
                    <Text fontWeight="bold" >{review.repository.fullName}</Text>
                    <Text fontSize="small" style={{ marginBottom: 5 }}>{dateFormat(review.createdAt)}</Text>
                    <Text>{review.text}</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 15 }}>
                <TouchableOpacity onPress={() => history.push(`/repoitem/${review.repository.id}`)}>
                    <Text style={buttonStyles.viewRepo}>View repository</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteClick(review.id)}>
                    <Text style={buttonStyles.deleteReview}>Delete review</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
const MyReviews = () => {
    const { data, loading } = useQuery(GET_USER, {
        variables: { includeReviews: true },
        fetchPolicy: 'cache-and-network'
    });

    if (loading) return null;
    const reviewNodes = data.authorizedUser ? data.authorizedUser.reviews.edges.map(edge => edge.node) : [];
    // console.log('reviewNodes', JSON.stringify(reviewNodes))
    return (
        <FlatList
            data={reviewNodes}
            ItemSeparatorComponent={() => <View />}
            renderItem={({ item }) => (
                <ReviewItem review={item} />
            )}
            style={{ paddingBottom: 10, paddingHorizontal: 10 }}
        />
    );
};

export default MyReviews;
