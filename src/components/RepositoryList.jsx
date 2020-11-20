import React from 'react';
import { FlatList, View, } from 'react-native';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';

const ItemSeparator = () => <View />;

export const RepositoryListContainer = ({ repos }) => {
    const repositoryNodes = repos ? repos.edges.map(edge => edge.node) : [];
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

const RepositoryList = () => {
    const { data } = useRepositories();
    if (!data) return null;
    return <RepositoryListContainer repos={data.repositories} />;
};


export default RepositoryList;