import ApolloClient from 'apollo-boost';
import { url } from './apiUrls';

const createApolloClient = () => {
    return new ApolloClient({
        uri: `${url}/graphql`,
    });
};

export default createApolloClient; 