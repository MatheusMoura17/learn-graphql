const { ApolloServer, gql } = require('apollo-server');

let books = [
  {
    id: 0,
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
  },
  {
    id: 1,
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
]

let lastId = 2;

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books,
    book: (_, { id }) => books.find(book => book.id == id)
  },
  Mutation: {
    book: (_, { title, author }) => {
      const id = lastId++;
      books
        .push({
          id,
          title,
          author
        })
      return books.find(book => book.id == id)
    }
  }
}

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs: gql`

    type Book {
      id: ID!
      title: String!
      author: String!
    }

    type Query {
      books: [Book]!
      book(id: ID!): Book
    }

    type Mutation {
      book(title: String!, author: String!): Book
    }
`,
  resolvers
})

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})