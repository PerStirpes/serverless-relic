const AWS = require("aws-sdk")
const { v4: uuidv4 } = require("uuid")

AWS.config.update({
    region: "us-east-2",
    
    // accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    // secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const table = "todos"
const docClient = new AWS.DynamoDB.DocumentClient()

async function run() {
    //   const params = {
    //     TableName: table,
    //     Item: {
    //       pk: "user#1",
    //       sk: `todo#${uuidv4()}`,
    //       data: {
    //         createdAt: Date.now(),
    //         updatedAt: Date.now(),
    //         done: false
    //       }
    //     }
    //   };
    //   const result = await docClient.put(params).promise();

    // const params = {
    //     TableName: table,
    //     Key: {
    //         pk: "user#1",
    //         sk: "todo#90d977c1-a272-4c7a-aec9-4975bad01922",
    //     },
    //     UpdateExpression: "set #data.#text = :newtext",
    //     ExpressionAttributeNames: {
    //         "#data": "data",
    //         "#text": "text",
    //     },
    //     ExpressionAttributeValues: {
    //         ":newtext": "this is a todo",
    //     },
    //     // ReturnValues: "ALL_NEW",
    // }
    // const result = await docClient.update(params).promise()

    const params = {
      TableName: table,
      KeyConditionExpression: "pk = :userid and begins_with(sk, :todokey)",
      ExpressionAttributeValues: {
        ":userid": "user#1",
        ":todokey": "todo#"
      }
    };
    const result = await docClient.query(params).promise();
    console.log(JSON.stringify(result, null, 2))
}

run()
