import { useQuery } from '@apollo/react-hooks';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (variables) => {
    const { sort, searchKeyword, first } = variables;
    let orderDirection, orderBy;
    switch (sort) {
    case 'highest':
        orderDirection = 'DESC';
        orderBy = 'RATING_AVERAGE';
        break;
    case 'lowest':
        orderDirection = 'ASC';
        orderBy = 'RATING_AVERAGE';
        break;
    default:
        orderDirection = 'DESC';
        orderBy = 'CREATED_AT';
        break;
    }

    const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
        variables: { orderBy, orderDirection, searchKeyword, first },
        fetchPolicy: 'cache-and-network'
    });

    const handleFetchMore = () => {
        const canFetchMore = !loading && data && data.repositories.pageInfo.hasNextPage;
        if (!canFetchMore) return;

        fetchMore({
            query: GET_REPOSITORIES,
            variables: {
                after: data.repositories.pageInfo.endCursor,
                orderBy, orderDirection, searchKeyword, first
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
                const nextResult = {
                    repositories: {
                        ...fetchMoreResult.repositories,
                        edges: [
                            ...previousResult.repositories.edges,
                            ...fetchMoreResult.repositories.edges,
                        ],
                    },                                                                                                             
                   
                };
                return nextResult;
            },
        });
    };
    return {
        data: data ? data.repositories : undefined,
        fetchMore: handleFetchMore,
        loading,
        ...result
    };
};

export default useRepositories;

