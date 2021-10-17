import { Server } from 'socket.io'

class IpcSocketIo {

  // tslint:disable-next-line:variable-name
  private _io: Server = null

  // tslint:disable-next-line:variable-name
  private _listeners: { [event: string]: Array<(client: any, data: any) => void> } = {}

  public get io(): Server {
    return this._io
  }

  public isDestroyed() {
    return false
  }

  public init(io: Server) {
    this._io = io

    this._io.on('connection', socket => {
      console.log('New client:', socket.id)
      socket.on('ipc', agrs => {
        // console.log('Receive ipc', agrs)
        const id = agrs[0]
        const data = agrs[1]
        this.trigger(id, data)
      })
    })

  }

  public trigger(id: string, data: any): void {
    if (this._listeners[id]) {
      this._listeners[id].forEach(listener => listener({ sender: this }, data))
    }
  }

  public on(event: string, cb: any) {
    // console.log('IpcSocketIo::on', event, cb)
    if (!this._listeners[event]) {
      this._listeners[event] = []
    }
    this._listeners[event].push(cb)
  }

  public removeAllListeners(event: string) {
    // console.log('IpcSocketIo::removeAllListeners', event)
    delete this._listeners[event]
  }

  public removeListener(event: string, cb: Function): void {
    // console.log('IpcSocketIo::removeListener', event, cb)
    if (this._listeners[event]) {
      this._listeners[event] = this._listeners[event].filter(listener => listener !== cb)
    }
    if (!this._listeners[event].length) {
      delete this._listeners[event]
    }
  }

  public send(event: string, data: any): void {
    // console.log('IpcSocketIo::send', event, data)
    this._io.emit(event, data)
  }
}

export const ipcSocketIo = new IpcSocketIo()
