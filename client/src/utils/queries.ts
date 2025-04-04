import { gql } from '@apollo/client';

export const GET_USER = gql`
query GetSingleUser {
  getSingleUser {
    _id
    username
    email
    savedBooks {
      bookId
      title
      authors
      description
      image
      link
    }
  }
}
`;