export const userTypeDefs = `#graphql
type User {
name:String
email:String
profileImage:String
}

input UserInput {
    name:String
    email:String!
    profileImage:String
}

type Query {
    getUsers:[User!]!
}

type Mutation {
    passwordLessAuthentication(input:UserInput!):User
}
`;
