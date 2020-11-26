import React, { useState } from 'react';

import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';
import { useHistory } from 'react-router-native';
import { useDebounce } from 'use-debounce';

import { FlatList, View, TouchableOpacity, TextInput } from 'react-native';
import Picker from '@react-native-community/picker/js/Picker';
import { containerStyles } from '../theme';
const RepositoryListHeader = () => {
    const [sort, setSort] = useState('latest');
    const { data } = useRepositories(sort);
    const [filter, setFilter] = useState('');
    const [searchTerm] = useDebounce(filter, 1000);
    console.log('searchTerm', searchTerm)

    return (
        <>
            <TextInput style={containerStyles.textInput} placeholder='Type here to search'
                value={filter}
                onChangeText={text => setFilter(text)}
            />
            <Picker
                selectedValue={sort}
                style={containerStyles.dropDown}
                onValueChange={(itemValue) => setSort(itemValue)}
            >
                <Picker.Item label="Latest repositories" value="latest" />
                <Picker.Item label="Highest rated repositories" value="highest" />
                <Picker.Item label="Lowest rated repositories" value="lowest" />
            </Picker>
        </>
    )

}

export class RepositoryListContainer extends React.Component {

    render() {
        return (
            <FlatList
                // ...
                ListHeaderComponent={() => { <RepositoryListHeader />; }}
            />
        );
    }
}