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
  static broadcastMessage = (json: string, message: string) => {
    this.mapSocket.forEach((value: any, key: any) => {
      if (key === 'admin') {
        value.send(json)
        value.send(message)
      }
    })
  }
  static handleMessage = (data: any, connection: any) => {
    const dataclinet = JSON.parse(data.toString())
    const idUser = dataclinet.idUser
    const message = dataclinet.message
    this.mapSocket.set(idUser, connection)
    connection.send(`${idUser} joined to server`)
    const json = `${idUser} joined to server`
    this.broadcastMessage(json, message)
  }
  static async connectionSocket() {
    SocketService.wsServer.on('connection', (connection: WebSocket) => {
      //   console.log('connected to socket')
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
