const {gql} = require('apollo-server-express');

const typeDefs = gql`
    type Query{
        me: User
    }
    
    type User{
        _id: ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]!
    }

    type Book {
        bookId : String
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }

    input BookInput {
        authors: [String]
        description: String!
        bookId: String!
        image: String!
        link: String!
        title: String!
      }

    type Auth{
        token: ID!
        user: User
    }

    type Mutation{
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        saveBook(input: BookInput!): User
        deleteBook(bookId: String!): User
    }
`;

module.exports = typeDefs;