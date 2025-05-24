// Resolvers
import { AuthResolver } from "./auth";

// Merging all together
export const Rsolvers = {
  Mutation: {
    ...AuthResolver,
  },
  Query: {},
};
