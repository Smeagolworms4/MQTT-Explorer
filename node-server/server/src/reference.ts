import { addAliases } from 'module-alias'
import { resolve } from 'path'

addAliases({
  electron: resolve(__dirname, '../../node-wrapper/electron'),
})
