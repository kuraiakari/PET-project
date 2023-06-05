import { WebSocket } from 'ws'
import {Blob} from 'node:buffer'

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
  static broadcastMessage = (type: string, toIdUser: string, content: any) => {
    if( type === 'signin' || type === 'signout' ){
      const conenect = this.mapSocket.get('admin')
      const message = content
      conenect.send(message)
    }
    if(type === 'buyProduct'){
      this.mapSocket.forEach((value: any, key: string) =>{
        if( key === toIdUser){
          const date =new Date
          const message = content.avatar + '].[' + content.message + '].[' + date 
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
      this.broadcastMessage(type, 'admin', content)
    }
    if (type === 'buyProduct') {
      console.log(1)
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
      connection.on('message', (data, isBinary) => {
        this.handleMessage(data, connection)
      })
    })
  }
}
export default SocketService
