import React, { useState } from 'react';

import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';
import { useHistory } from 'react-router-native';
import { useDebounce } from 'use-debounce';

import { FlatList, View, TouchableOpacity, TextInput } from 'react-native';
import Picker from '@react-native-community/picker/js/Picker';
import { containerStyles } from '../theme';

const ItemSeparator = () => <View />;

const FilterRepos = ({ setFilter, filter }) => {
    return (
        <TextInput style={containerStyles.textInput} placeholder='Type here to search'
            value={filter}
            onChangeText={text => setFilter(text)}
        />
    );
};

const SelectSorting = ({ sort, setSort }) => {
    return (
        <Picker
            selectedValue={sort}
            style={containerStyles.dropDown}
            onValueChange={(itemValue) => setSort(itemValue)}
        >
            <Picker.Item label="Latest repositories" value="latest" />
            <Picker.Item label="Highest rated repositories" value="highest" />
            <Picker.Item label="Lowest rated repositories" value="lowest" />
        </Picker>
    );
};

export class RepositoryListContainer extends React.Component {
    renderHeader = () => {
        return (
            <>
                <FilterRepos setFilter={this.props.setFilter} filter={this.props.filter} />
                <SelectSorting setSort={this.props.setSort} sort={this.props.sort} />
            </>
        );
    };

    render() {
        const repositoryNodes = this.props.repos ? this.props.repos.edges.map(edge => edge.node) : [];
        return (
            <FlatList
                data={repositoryNodes}
                ItemSeparatorComponent={ItemSeparator}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => this.props.history.push(`/repoitem/${item.id}`)}>
                        <RepositoryItem item={item} />
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => `${index}`}
                ListHeaderComponent={this.renderHeader}
                style={{ paddingBottom: 10, paddingHorizontal: 10 }}
                onEndReached={this.props.onEndReach}
                onEndReachedThreshold={0.5}
            />
        );
    }
}

const RepositoryList = () => {

    const [sort, setSort] = useState();
    const [filter, setFilter] = useState('');
    const [searchKeyword] = useDebounce(filter, 1000);
    const history = useHistory();
    const { data, fetchMore } = useRepositories({ sort, searchKeyword, first: 8 });

    if (!data) return null;

    const onEndReach = () => {
        fetchMore();
    };

    return (
        <RepositoryListContainer
            repos={data}
            sort={sort}
            setSort={setSort}
            filter={filter}
            setFilter={setFilter}
            history={history}
            onEndReach={onEndReach}
        />
    );
};


export default RepositoryList;