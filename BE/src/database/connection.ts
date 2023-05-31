import mongoose from 'mongoose'
import { MONGODB_URL } from '../config/index'

export const databaseConnection = async () => {
  try {
    await mongoose.connect(`${MONGODB_URL}`)
    console.log('Connect successfuly')
  } catch (error) {
    console.log('Connect error')
    console.log(error)
    process.exit(1)
  }
}
