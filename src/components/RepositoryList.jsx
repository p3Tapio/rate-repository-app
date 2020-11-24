import React from 'react';
import { FlatList, View, TouchableOpacity } from 'react-native';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';
import { useHistory } from 'react-router-native';

const ItemSeparator = () => <View />;

export const RepositoryListContainer = ({ repos }) => {
    const history = useHistory();
    const repositoryNodes = repos ? repos.edges.map(edge => edge.node) : [];

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={repositoryNodes}
                ItemSeparatorComponent={ItemSeparator}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => history.push(`/repoitem/${item.id}`)}>
                        <RepositoryItem item={item} />
                    </TouchableOpacity>
                )}
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