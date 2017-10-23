import { lstatSync } from 'fs' // Nodejs module
import readChunk from 'read-chunk' // Nodejs module
import fileType from 'file-type'
import mimeParser from 'mime'

export const getExtension = (filename) => filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2)

export const isDirectory = source => lstatSync(source).isDirectory()
export const isFile = source => lstatSync(source).isFile()

// https://www.npmjs.com/package/file-mime-types
const isDocument = subtype => [
  'pdf',
  'msword',
  'excel',
  'powerpoint',
  'officedocument'
].some(choice => subtype.includes(choice))

const isArchive = subtype => [
  'compressed',
  'zip',
  'stuffit'
].some(choice => subtype.includes(choice))

const mimeTypeParse = mime => {
  if (mime) {
    let [type, subtype] = mime.split('/')
    if (type === 'application') {
      if (isDocument(subtype)) type = 'document'
      else if (isArchive(subtype)) type = 'archive'
      else type = 'unknown'
    }
    return type
  }
  return 'unknown'
}

export const getFileType = (filepath) => {
  let buffer = readChunk.sync(filepath, 0, 4100)
  let result = fileType(buffer)

  if (result) {
    let { ext, mime } = result
    return {
      ext: ext,
      type: mimeTypeParse(mime)
    }
  } else {
    return {
      ext: getExtension(filepath),
      type: mimeTypeParse(mimeParser.getType(filepath))
    }
  }
}

export const getThumbnailByExtension = (ext) => {
  Error(`not yet implemented -- ${ext}`)
  return undefined
}
