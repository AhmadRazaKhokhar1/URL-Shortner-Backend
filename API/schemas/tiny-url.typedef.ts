export const tinyUrlTypeDefs = `#graphql
type TinyUrl {
_id:String!
originalUrl: String!
shortUrl: String!
userId:String!
clicksCount:Int!
}

input TinyUrlInput {
   originalUrl:String!
   userId:String!
}

type Query {
    getAllUrls(userId:String!):[TinyUrl]
    findOriginalUrl(tinyUrl:String):TinyUrl!
}

type Mutation {
    makeTinyUrl(input:TinyUrlInput!):TinyUrl!
}
`;
