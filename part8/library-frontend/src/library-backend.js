const { ApolloServer, gql } = require("apollo-server");
const { v1: uuid } = require("uuid");
const mongoose = require("mongoose");
const Book = require("./models/books");
const Author = require("./models/authors");
require("dotenv").config();

// const mongoUrl = process.env.MONGODB_URI;
const mongoUrl =
  "mongodb+srv://FirstUser:Aa12345@cluster0-zd4co.mongodb.net/person-app?retryWrites=true&w=majority";

mongoose
  .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

let authors = [
  {
    name: "Robert Martin",
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963,
  },
  {
    name: "Fyodor Dostoevsky",
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821,
  },
  {
    name: "Joshua Kerievsky", // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: "Sandi Metz", // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
];

/*
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 */

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"],
  },
  {
    title: "The Demon ",
    published: 1872,
    author: "Fyodor Dostoevsky",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"],
  },
];

const typeDefs = gql`
  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;

const resolvers = {
  Query: {
    bookCount: () => books.length,
    allBooks: (root, args) => {
      if (args.author && args.genre) {
        return books.filter(
          (book) =>
            book.author === args.author &&
            book.genres.indexOf(args.genre) !== -1
        );
      } else if (args.genre) {
        return books.filter((book) => book.genres.indexOf(args.genre) !== -1);
      } else if (args.author) {
        return books.filter((book) => book.author === args.author);
      } else {
        return books;
      }
    },
    allAuthors: () => {
      return authors.map((author) => {
        const name = author.name;
        const born = author.born;
        const bookCount = books.filter((book) => book.author === name);
        return {
          name,
          born,
          bookCount: bookCount.length,
        };
      });
    },
    authorCount: () => authors.length,
  },
  Mutation: {
    addBook: async (root, args) => {
      // const book= {...args, id: uuid()}

      const author=await Author.find({ name: args.author })
      console.log(author)
      if(author[0] !== undefined){
        const book = new Book({ ...args });
        book.author=author[0]._id
        console.log(book)
        book.save();
        return  book
      } else{
        const newAuthor=new Author({
          name:args.author,
          born:null,
        })
        
        const response=await newAuthor.save();
        const book = new Book({ ...args });
        book.author=response._id
        book.save();
        return book
      }

      console.log();
      console.log(book);

      // books=books.concat(book)
      // if(authors.indexOf(book.author) === -1){
      //     authors=authors.concat({name:book.author,id:uuid()})
      // }
      // return book
    },
    editAuthor(root, args) {
      const author = authors.find((author) => author.name === args.name);
      if (!author) {
        return null;
      }
      author.born = args.setBornTo;
      authors = authors.map((authorDb) =>
        authorDb.name === author.name ? author : authorDb
      );
      return author;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
