import {gql} from '@apollo/client';

export const CREATE_USER = gql`
mutation CreateUser($username: String!, $email: String!, $password: String!) {
  createUser(username: $username, email: $email, password: $password) {
    user {
      username
      _id
      savedBooks {
        bookId
        authors
        description
        image
        link
        title
      }
      email
    }
    token
  }
 }
`;

