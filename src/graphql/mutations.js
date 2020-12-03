import { gql } from 'apollo-boost';

export const SIGN_IN = gql`
    mutation authorize($username: String!, $password: String!) {
        authorize(credentials: { username: $username, password: $password }) {
            accessToken
        }
    }
`;
export const SIGN_UP = gql`
    mutation createUser($username: String!, $password: String!) {
        createUser(user: { username: $username, password: $password }) {
            id
            username
        }
    }
`;
export const REVIEW = gql`
    mutation createReview($repositoryName: String!, $ownerName: String!, $rating: Int!, $text:String) {
        createReview(review: {repositoryName: $repositoryName, ownerName: $ownerName,rating:$rating, text:$text } ) {
        repository { id }
    }
  }
`;
export const DELETE_REVIEW = gql`
    mutation deleteReview($id: ID!) {
        deleteReview(id: $id)
    }
`; 
