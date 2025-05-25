export const tinyUrlTypeDefs = `#graphql
type TinyUrl {
originalUrl: String!
shortUrl: String!
clicksCount:Int!
}

input TinyUrlInput {
   originalUrl:String!
}

type Query {
    getAllUrls:[TinyUrl!]!
    findOriginalUrl(tinyUrl:String):TinyUrl!
}

type Mutation {
    makeTinyUrl(input:TinyUrlInput!):TinyUrl!
}
`;
