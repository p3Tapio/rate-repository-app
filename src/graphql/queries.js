import { gql } from 'apollo-boost';

export const GET_REPOSITORIES = gql`
    query {
        repositories {
            edges {
                node {
                id
                ownerAvatarUrl
                description
                fullName
                language
                stargazersCount
                forksCount
                reviewCount
                ratingAverage
                }
            }
        }
    }
`;
export const GET_REPO_DETAILS = gql`
    query repository($id: ID!) {
        repository(id: $id) {
            id
            ownerAvatarUrl
            fullName
            description
            language
            stargazersCount
            forksCount
            reviewCount
            ratingAverage
            url
            reviews {
                edges {
                    node {
                        id
                        text
                        rating
                        createdAt
                        user {
                            id
                            username
                        }
                    }
                }
            }
        }
    }
`;
export const GET_USER = gql`
    query {
        authorizedUser {
            id
            username
        }
    }
`;

