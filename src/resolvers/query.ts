import gql from 'graphql-tag';

export const FEED_QUERY = gql`
    {
        feed {
            links {
                id
                url
                description
            }
        }
    }
`

export const FEED_SEARCH_QUERY = gql`
    query FeedSearchQuery($filter: String!) {
        feed(filter: $filter) {
            links {
                id
                url
                description
                postedBy {
                    id
                    name
                }
            }
        }
    }
`
