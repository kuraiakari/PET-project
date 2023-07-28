import mongoose from 'mongoose'
import pg from "pg"
import { MONGODB_URL, PG_USER, PG_HOST, PG_DATABASE, PG_PASSWORD, PG_PORT } from '../config/index'

export const databaseConnectionMongoDB = async () => {
  try {
    await mongoose.connect(`${MONGODB_URL}`,)
    console.log('Connect successfuly MongoDb')
  } catch (error) {
    console.log('Connect error')
    console.log(error)
    process.exit(1)
  }
}

export const databaseConnectionPostgreSQL = async () => {
  try {
    const client = new pg.Client({
      user: PG_USER,
      host: PG_HOST,
      database: PG_DATABASE,
      password: PG_PASSWORD,
      port: PG_PORT
    })

    await client.connect()
    console.log('Connect successfuly PostgreSQL')
  } catch (error) {
    console.log('Connect error')
    console.log(error)
    process.exit(1)
  }
}




// const uri = "mongodb+srv://MyProject:<password>@atlascluster.qqtvdo5.mongodb.net/?retryWrites=true&w=majority";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

