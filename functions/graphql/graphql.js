const { ApolloServer, gql } = require("apollo-server-lambda")
const AWS = require("aws-sdk")
const { v4: uuidv4 } = require("uuid")

AWS.config.update({
    region: "us-east-2",
    accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY
  });
  
const typeDefs = gql`
    type Query {
        todos: [Todo]!
    }
    type Todo {
        id: ID!
        text: String!
        done: Boolean!
    }
    type Mutation {
        addTodo(text: String!): Todo
        updateTodoDone(id: ID!): Todo
    }
`

const todos = {}
let todoIndex = 0
const resolvers = {
    Query: {
        todos: async (parent, args, { user }) => {
            if (!user) {
                return []
            } else {
                const params = {
                    TableName: table,
                    KeyConditionExpression: "pk = :userid and begins_with(sk, :todokey)",
                    ExpressionAttributeValues: {
                        ":userid": `user#${user}`,
                        ":todokey": "todo#",
                    },
                }
                const result = await docClient.query(params).promise()
                return result.Items.map(({ pk, sk, data }) => {
                    return {
                        id: sk.replace("todo#", ""),
                        ...data,
                    }
                })
            }
        },
    },
    Mutation: {
        addTodo: async (_, { text }, { user }) => {
            if (!user) {
                throw new Error("Must be authenticated to insert todos")
            }
            const todoUuid = uuidv4()
            const params = {
                TableName: table,
                Item: {
                    pk: `user#${user}`,
                    sk: `todo#${todoUuid}`,
                    data: {
                        createdAt: Date.now(),
                        updatedAt: Date.now(),
                        done: false,
                        text,
                    },
                },
            }
            await docClient.put(params).promise()
            return {
                id: todoUuid,
                done: false,
                text,
            }
        },
        updateTodoDone: async (_, { id }, { user }) => {
            if (!user) {
                throw new Error("Must be authenticated to insert todos")
            }
            const params = {
                TableName: table,
                Key: {
                    pk: `user#${user}`,
                    sk: `todo#${id}`,
                },
                UpdateExpression: "set #data.#done = :newdone",
                ExpressionAttributeNames: {
                    "#data": "data",
                    "#done": "done",
                },
                ExpressionAttributeValues: {
                    ":newdone": true,
                },
                ReturnValues: "ALL_NEW",
            }
            const result = await docClient.update(params).promise()

            const { pk, sk, data } = result.Attributes
            return {
                id: sk.replace("todo#", ""),
                text: data.text,
                done: data.done,
            }
        },
    },
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ context }) => {
        if (context.clientContext.user) {
            return { user: context.clientContext.user.sub }
        } else {
            return {}
        }
    },
    playground: true,
    introspection: true,
})

exports.handler = server.createHandler({
    cors: {
        origin: "*",
        credentials: true,
    },
})
