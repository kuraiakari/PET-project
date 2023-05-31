import path from 'path'
import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'

import http from 'http'
import { WebSocket, WebSocketServer } from 'ws'

import { PORT_HTTP } from './config'
import { databaseConnection } from './database'
import SocketService from '../src/controllers/socketServer/socket'
import router from './router'
const StartApp = async () => {
  const app = express()

  await databaseConnection()

  const server = http.createServer()
  const wsServer = new WebSocketServer({ server })
  SocketService.server = server
  SocketService.wsServer = wsServer
  SocketService.createSocket()
  SocketService.connectionSocket()
  app.use(cors())

  app.use('/v1', router)
  app.use('/images', express.static('./images'))
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  app.listen(PORT_HTTP, () => console.log('Server running on port ' + PORT_HTTP))
}

StartApp()
