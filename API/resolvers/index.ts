// Resolvers
import { AuthResolver } from "./auth/index.js";

// Merging all together
export const Resolvers = {
  Mutation: {
    ...AuthResolver.Mutation,
  },
  Query: {
    ...AuthResolver.Query
  },
};
