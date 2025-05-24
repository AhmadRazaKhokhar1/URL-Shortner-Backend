// Apollo
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

// Express
import express from "express";

// API
import { Resolvers, TypeDefs } from "./API/index.js";

// Dotenv
import { configDotenv } from "dotenv";
import { ConnectMongoDB, startEmailOTPQueueProcessors } from "./utils/index.js";
configDotenv();

// Environment variables
const PORT = process.env.PORT || 5000;

// Apollo Server
async function startServer() {
  const app = express();

  const apolloServer = new ApolloServer({
    typeDefs: TypeDefs,
    resolvers: Resolvers,
    introspection: true,
  });

  await apolloServer.start();
  await ConnectMongoDB();
  // Middlewares
  app.use(express.json());
  app.use("/graphql", express.json(), expressMiddleware(apolloServer));
  startEmailOTPQueueProcessors()
  // App Listener
  app.listen(PORT, () => {
    console.log(`The Backend is live at http://localhost:${PORT}/graphql ✅`);
  });
}

startServer().catch((err) => {
  console.error("Server failed to start", err);
});
