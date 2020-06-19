require('dotenv').config();
const { ApolloServer,  UserInputError, AuthenticationError, gql } = require("apollo-server");
const { v1: uuid } = require("uuid");
const mongoose = require("mongoose");
const Book = require("./models/books");
const Author = require("./models/authors");
const User = require("./models/users");

const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET
const mongoUrl = process.env.MONGODB_URI
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
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

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
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, born: Int!): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => {
      const books=await Book.find({})
      return books.length
    },
    allBooks: async (root, args) => {
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
        const books=await Book.find({}).populate('author');
        console.log(books)
        return books
      }
    },
    allAuthors:  async () => {
      const authors=await Author.find({})
      const books = await Book.find({})

      return authors.map(async (author) => {
        const name = author.name
        const born = author.born
        const bookCount= books.filter((book) => book.author.toString() === author._id.toString());
        if(author.bookCount !== bookCount.length){
          await Author.findByIdAndUpdate(author._id,{bookCount: bookCount.length})
        }

         return {
          name,
          born,
          bookCount: bookCount.length,
        }
      })
    },
    authorCount: async () => {
      const authors=await Author.find({})
      return authors.length
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const author=await Author.find({ name: args.author })
      if(author[0] !== undefined){
        const book = new Book({ ...args });
        book.author=author[0]._id

        const currentUser = context.currentUser

        if (!currentUser) {
          throw new AuthenticationError("not authenticated")
        }
    
        
        try{
          await book.save()
          
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
        })
        }

        return  book

      } else{
        const newAuthor=new Author({
          name:args.author,
          born:null,
          bookCount:1
        })
        try{
          const response=await newAuthor.save();
          const book = new Book({ ...args });
          book.author=response._id
          book.save();
          return book
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
        })
       }
      }

    },
    async editAuthor(root, args,context) {
      const author = await Author.find({name : args.name});
      console.log(author[0])

      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
  

      if (!author[0]) {
        return null;
      }

      try{
          await Author.findByIdAndUpdate(author[0]._id,{born : args.born})
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
      })
    }

      const updatedAuthor = await Author.find({name : args.name});
 
      return updatedAuthor[0];
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username, favoriteGenre:args.favoriteGenre })
  
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secred' ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
