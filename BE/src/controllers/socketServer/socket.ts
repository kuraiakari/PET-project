import { WebSocket } from 'ws'
import users from '../../database/models/user'
import { v4 as uuidv4 } from 'uuid'

class SocketService {
  static server: any
  static wsServer: any
  static mapSocket = new Map()
  static async createSocket() {
    const port = 8002
    SocketService.server.listen(port, () => {
      console.log(`WebSocket server is running on port ${port}`)
    })
  }
  static broadcastMessage = async (type: string, toIdUser: string, content: any) => {
    if (type === 'signout') {
      // delete refresh token when user logs out
      // console.log(toIdUser)
      const data: any = await users.findOne({ _id: toIdUser})
      if (data) data.tokenRefresh = ''
      await users.updateOne({ _id: toIdUser}, data)
    }
    if (type === 'signin' || type === 'signout') {
      const conenect = this.mapSocket.get('admin')
      const message = content
      conenect.send(message)
    }
    if (type === 'buyProduct') {
      const date = new Date()
      let quantity = 0
      const id = uuidv4()
      const dataNotification = {
        id,
        wasSeen: false,
        messageNotification: {
          avataClientBuy: content.avatar,
          messageClientBuy: content.message,
          dateBuy: date
        }
      }
      const data = await users.findOne({ _id: toIdUser })
      if (data) {
        data.listNotification.push(dataNotification)
        data.listNotification.forEach((data: any) => {
          if (!data.wasSeen) quantity++
        })
        await users.updateOne({ _id: toIdUser }, data)
      }
      this.mapSocket.forEach((value: any, key: string) => {
        if (key === toIdUser) {
          const message = content.avatar + '].[' + content.message + '].[' + date + '].[' + quantity + '].[' + id + '].[' + 'false'
          value.send(message)
        }
      })
    }
  }
  static handleMessage = (data: any, connection: any) => {
    const dataMessFromClient = JSON.parse(data.toString())
    const type = dataMessFromClient.type
    const idUser = dataMessFromClient.content.idUser
    //chiếm quyền admin
    if (type === 'admin') {
      this.mapSocket.set('admin', connection)
    }
    if (type === 'signin') {
      this.mapSocket.set(idUser, connection)
      // console.log(idUser)
      const content = dataMessFromClient.content.message || `${idUser} joined to server`
      this.broadcastMessage(type, 'admin', content)
    }
    if (type === 'signout') {
      if (this.mapSocket.get(idUser)) this.mapSocket.delete(idUser)
      const content = dataMessFromClient.content.message || `${idUser} disconnected from server`
      this.broadcastMessage(type, idUser, content)
    }
    if (type === 'buyProduct') {
      const content = dataMessFromClient.content
      const toIdUser = dataMessFromClient.content.to
      this.broadcastMessage(type, toIdUser, content)
    }
  }
  static async connectionSocket() {
    SocketService.wsServer.on('connection', (connection: WebSocket) => {
      console.log('connected to socket')
      //khởi tạo 1 admin ảo
      if (!this.mapSocket.get('admin')) this.mapSocket.set('admin', connection)

      connection.on('error', console.error)
      connection.on('message', (data: any, isBinary: any) => {
        this.handleMessage(data, connection)
      })
    })
  }
}
export default SocketService
