
import { useQuery } from '@apollo/react-hooks';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (sort, searchKeyword) => {
 
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

    const { data, error, loading } = useQuery(GET_REPOSITORIES, {
        variables: { orderBy, orderDirection, searchKeyword },
        fetchPolicy: 'cache-and-network'
    });
    return { data, loading, error };
};

export default useRepositories;

