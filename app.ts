// Apollo & Express
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";

// API
import { Resolvers, TypeDefs } from "./API/index.js";

// Dotenv
import { configDotenv } from "dotenv";

// Middlewares
import { AuthMiddleWare } from "./API/middlewares/auth.js";

// Utils
import { ConnectMongoDB, startEmailOTPQueueProcessors } from "./utils/index.js";

// Routers
import AuthRouter from "./API/routes/auth/index.js";

// Cookie Parser
import cookieParser from 'cookie-parser';
import cors from 'cors';

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
  app.use(cors({origin:"http://localhost:3000", credentials:true}))
  app.use(cookieParser())
  app.use("/auth", AuthRouter);
  app.use(
    "/graphql",
    express.json(),
    AuthMiddleWare,
    expressMiddleware(apolloServer),
  );

  // Processors
  startEmailOTPQueueProcessors();
  // App Listener
  app.listen(PORT, () => {
    console.log(`The Backend is live at http://localhost:${PORT}/graphql ✅`);
  });
}

startServer().catch((err) => {
  console.error("Server failed to start", err);
});
