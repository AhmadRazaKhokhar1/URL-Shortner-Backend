// Resolvers

import { TinyUrlResolver } from "./tiny-url/index.js";


// Merging all together
export const Resolvers = {
  Mutation: {
    ...TinyUrlResolver.Mutation,
  },
  Query: {
    ...TinyUrlResolver.Query
  },
};
