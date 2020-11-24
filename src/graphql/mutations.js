import { gql } from 'apollo-boost';

export const SIGN_IN = gql`
    mutation authorize($username: String!, $password: String!) {
        authorize(credentials: { username: $username, password: $password }) {
            accessToken
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