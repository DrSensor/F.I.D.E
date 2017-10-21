import { lstatSync } from 'fs'

export const isDirectory = source => lstatSync(source).isDirectory()
export const isFile = source => lstatSync(source).isFile()

export const getExtension = (filename) => filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2)
export const getThumbnailByExtension = (ext) => {
  Error(`not yet implemented -- ${ext}`)
  return undefined
}
