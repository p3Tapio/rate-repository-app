import React, { useState } from 'react';
import { FlatList, View, TouchableOpacity } from 'react-native';
import Picker from '@react-native-community/picker/js/Picker';

import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';
import { useHistory } from 'react-router-native';
import { containerStyles } from '../theme';

const ItemSeparator = () => <View />;

const SelectSorting = ({ sort, setSort }) => {

    return (
        <Picker
            selectedValue={sort}
            style={containerStyles.mainCardContainer}
            onValueChange={(itemValue) => setSort(itemValue)}
        >
            <Picker.Item label="Latest repositories" value="latest" />
            <Picker.Item label="Highest rated repositories" value="highest" />
            <Picker.Item label="Lowest rated repositories" value="lowest" />
        </Picker>
    );
};

export const RepositoryListContainer = ({ repos, sort, setSort }) => {
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
                ListHeaderComponent={() => <SelectSorting setSort={setSort} sort={sort} />}
                style={{ paddingBottom: 10, paddingHorizontal: 10 }}
            />
        </View>
    );
};

const RepositoryList = () => {
    const [sort, setSort] = useState('latest');
    const { data } = useRepositories(sort);

    if (!data) return null;

    return (
        <RepositoryListContainer repos={data.repositories} sort={sort} setSort={setSort} />
    );
};

export default RepositoryList;