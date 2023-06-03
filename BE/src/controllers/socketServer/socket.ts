import { WebSocket } from 'ws'
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
  static broadcastMessage = (idUser: string, json: string, message: string) => {
    this.mapSocket.forEach((value: any, key: any) => {
    console.log(key)
      if (key === 'admin' && idUser !== 'admin') {
        value.send(json)
        if (message) value.send(message)
        return
      }
      if (key === 'admin' && idUser === 'admin') {
        // console.log(value.readyState === WebSocket.OPEN)
        if (message) value.send(message)
      }
    })
  }
  static handleMessage = (data: any, connection: any) => {
    const dataMessFromClient = JSON.parse(data.toString())
    console.log(dataMessFromClient)
    const type = dataMessFromClient.type
    const idUser = dataMessFromClient.content.idUser
    const message = dataMessFromClient.content.message
    console.log(idUser, message)
    if (!this.mapSocket.get(idUser)) this.mapSocket.set(idUser, connection)
    // console.log(idUser)
    if (idUser !== 'admin') {
      const json = `${idUser} joined to server`
      this.broadcastMessage(idUser, json, message)
    } else {
      const json = `from server`
      this.broadcastMessage(idUser, json, message)
    }
  }
  static async connectionSocket() {
    SocketService.wsServer.on('connection', (connection: WebSocket) => {
        console.log('connected to socket')
      //   this.mapSocket.set(idUser, connection)

      connection.on('error', console.error)
      connection.on('message', (data, isBinary) => {
        this.handleMessage(data, connection)
      })

      connection.on('close', () => {
        console.log('disconnectSocket')
      })
    })
  }
}
export default SocketService
