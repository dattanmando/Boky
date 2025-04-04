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

export const LOGIN_USER = gql`
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      email
      savedBooks {
        bookId
        title
        authors
        description
        image
        link
      }
      username
    }
  }
}
`;

export const SAVE_BOOK = gql`
mutation SaveBook($book: BookInput!) {
  saveBook(book: $book) {
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

export const REMOVE_BOOK = gql`
mutation DeleteBook($bookId: String!) {
  deleteBook(bookId: $bookId) {
    _id
    username
    email
    savedBooks {
      bookId
    }
  }
}
`;

