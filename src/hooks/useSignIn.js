import { useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useApolloClient } from '@apollo/client';
import { SIGN_IN } from '../graphql/mutations';
import AuthStorageContext from '../contexts/AuthStorageContext';
import { useHistory } from 'react-router-native';


const useSignIn = () => {
    const [mutate, result] = useMutation(SIGN_IN);
    const client = useApolloClient();
    const authStorage = useContext(AuthStorageContext);
    const history = useHistory();

    const signIn = async ({ username, password }) => {
        const res = await mutate({ variables: { username, password } });
        await authStorage.setAccessToken(res.data.authorize.accessToken);
        await client.resetStore();
        history.push('/');
    };
    return [signIn, result];
};

export default useSignIn; 