import { ApolloServer } from "@apollo/server";
import { configDotenv } from "dotenv";
import express from "express";

// Environment variables
configDotenv()
const PORT = process.env.PORT || 5000;
const testSchema = `#graphql 
type Book {
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }`;
const apolloServer = new ApolloServer({
    typeDefs:testSchema
});
const app = express();

app.listen(PORT, () =>
  console.log(`The Backend is live at http://localhost:${PORT}`),
);
