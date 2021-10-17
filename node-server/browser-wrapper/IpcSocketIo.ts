import { io } from '../server/node_modules/socket.io-client'
const socket = io()

const wait = async () => {
  if (!socket.connected) {
    await new Promise(r => setTimeout(r, 50))
    await wait()
  }
}

class IpcSocketIo {

  public async on(event: string, cb: any) {
    // console.log('IpcSocketIo::on', event, cb)
    await wait()
    socket.on(event, (data: any) => {
      // console.log('Receive Data:', data)
      cb(data)
    })
  }

  public async removeAllListeners(event: string) {
    // console.log('IpcSocketIo::removeAllListeners', event)
    await wait()
    socket.removeAllListeners(event)
  }

  public async removeListener(event: string, cb: any) {
    // console.log('IpcSocketIo::removeListener', event, cb)
    await wait()
    socket.removeListener(event, cb)
  }

  public async send(event: string, data: any) {
    // console.log('IpcSocketIo::send', event, data)
    await wait()
    socket.emit('ipc', [event, data])
  }
}

export const ipcSocketIo = new IpcSocketIo()
