import { useQuery } from '@apollo/react-hooks';
import { GET_REPO_DETAILS } from '../graphql/queries';

const useRepoDetails = (variables) => {
    const { id, first } = variables;

    const { data, loading, fetchMore } = useQuery(GET_REPO_DETAILS, {
        variables: { id, first },
        fetchPolicy: 'cache-and-network'
    });

    const handleFetchMore = () => {
        const canFetchMore = !loading && data && data.repository.reviews.pageInfo.hasNextPage;
        if (!canFetchMore) return;

        fetchMore({
            query: GET_REPO_DETAILS,
            variables: {
                after: data.repository.reviews.pageInfo.endCursor,
                id
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
                const nextResult = {
                    repository: {
                        ...fetchMoreResult.repository,
                        reviews: {
                            ...fetchMoreResult.repository.reviews,
                            edges: [
                                ...previousResult.repository.reviews.edges,
                                ...fetchMoreResult.repository.reviews.edges,
                            ],
                        }
                    }
                };
                return nextResult;
            }
        });
    };
    return { data, loading, fetchMore: handleFetchMore };
};

export default useRepoDetails; 