const { ApolloServer, gql } = require("apollo-server-lambda")

const typeDefs = gql`
    type Query {
        hello: String
    }
`
const resolvers = {
    Query: {
        hello: () => "Hello world!",
    },
}

const server = new ApolloServer({
    typeDefs,
    resolvers,

    playground: true,
    introspection: true,
})

exports.handler = server.createHandler()
