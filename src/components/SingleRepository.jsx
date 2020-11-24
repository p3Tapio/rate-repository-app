import React from 'react'
import { useParams } from 'react-router-native';

import { useQuery } from '@apollo/react-hooks';
import { GET_REPO_DETAILS } from '../graphql/queries';

import { View, Image } from 'react-native';
import Text from './Text';
import { containerStyles } from '../theme';
import RepositoryItem from './RepositoryItem';

const SingleRepository = () => {
    const { id } = useParams();
    const { data, loading  } = useQuery(GET_REPO_DETAILS, {
        variables: { id: id },
        fetchPolicy: 'cache-and-network'
    });
    console.log('data', data)

    // console.log('item', item)

    if(loading) return null;

    return (
        <RepositoryItem item={data.repository}/>
    );
};

export default SingleRepository;
