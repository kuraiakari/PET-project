import path from 'path'
import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'

import { PORT } from './config'
import { databaseConnection } from './database'
import router from './router'
const StartApp = async () => {
  const app = express()

  await databaseConnection()

  app.use(cors())

  app.use(bodyParser.json())

  app.use('/v1', router)

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  app.listen(PORT, () => console.log('Server running on port ' + PORT))
}

StartApp()
