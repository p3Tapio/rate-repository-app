
import { gql } from 'apollo-boost';

export const GET_REPOSITORIES = gql`
    query repositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String, $first:Int, $after: String) {
        repositories(orderBy:$orderBy, orderDirection:$orderDirection, searchKeyword: $searchKeyword, first:$first, after:$after) {
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
                cursor
            }
            pageInfo {
                endCursor
                startCursor
                totalCount
                hasNextPage
            }
        }
    }
`;

export const GET_REPO_DETAILS = gql`
    query repository($id: ID!, $after: String, $first: Int) {
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
            reviews(first:$first, after:$after) {
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
                pageInfo {
                    endCursor
                    startCursor
                    totalCount
                    hasNextPage
                  }
            }
        }
    }
`;
export const GET_USER = gql`
query getAuthorizedUser($includeReviews: Boolean = false) {
        authorizedUser {
            id
            username
            reviews @include(if: $includeReviews) {
                edges {
                    node {
                        id
                        text
                        rating
                        createdAt 
                        repository {
                            id
                            fullName
                        }
                    }
                }
            }
        }
    }
`;
