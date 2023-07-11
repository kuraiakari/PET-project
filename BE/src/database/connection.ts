import mongoose from 'mongoose'
import pg from "pg"
import { MONGODB_URL, PG_USER, PG_HOST, PG_DATABASE, PG_PASSWORD, PG_PORT } from '../config/index'

export const databaseConnectionMongoDB = async () => {
  try {
    await mongoose.connect(`${MONGODB_URL}`)
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
