import { ipcSocketIo } from './IpcSocketIo'
import packageJson from '../../package.json'

export const app = {
  commandLine: {
    appendSwitch(arg: string) {
      console.log('DUMMY appendSwitch:', arg)
    },
  },
}

export const remote = {
  app: {
    getVersion() {
      return packageJson.version
    },
  },
  getCurrentWindow() {
    return window
  },
}

export const BrowserWindow = {
}

export const Menu = {
}

export interface IpcRenderer {
  on(event: string, cb: Function): void
  removeAllListeners(event: string): void
  removeListener(event: string, cb: Function): void
  send(event: string, data: any): void
}

export interface IpcMain extends IpcRenderer {
}

export class IpcRendererImplementation implements IpcMain {

  public on(event: string, cb: Function): void {
    ipcSocketIo.on(event, (data: any) => {
      cb({ sender: this }, data)
    })
  }

  public removeAllListeners(event: string): void {
    ipcSocketIo.removeAllListeners(event)
  }

  public removeListener(event: string, cb: Function): void {
    ipcSocketIo.removeListener(event, cb)
  }

  public send(event: string, data: any): void {
    ipcSocketIo.send(event, data)
  }
}

export const ipcMain = new IpcRendererImplementation()
export const ipcRenderer = new IpcRendererImplementation()
