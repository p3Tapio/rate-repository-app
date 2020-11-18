import React from 'react';
import { FlatList, View, } from 'react-native';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';

const ItemSeparator = () => <View />;

const RepositoryList = () => {
    const { data } = useRepositories();
    const repositoryNodes = data ? data.repositories.edges.map(edge => edge.node) : [];
    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={repositoryNodes}
                ItemSeparatorComponent={ItemSeparator}
                renderItem={RepositoryItem}
                keyExtractor={(item, index) => `${index}`}
                style={{ paddingBottom: 10, paddingHorizontal: 10 }}
            />
        </View>
    );
};

export default RepositoryList;