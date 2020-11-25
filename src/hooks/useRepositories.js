
import { useQuery } from '@apollo/react-hooks';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (value) => {
 
    let orderDirection, orderBy;
    switch (value) {
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
        variables: { orderBy, orderDirection },
        fetchPolicy: 'cache-and-network'
    });
    return { data, loading, error };
};

export default useRepositories;

