import Fingerprint from 'fingerprintjs2'
import crypto from 'crypto-js'
import SecureStorage from 'secure-web-storage'

export let fingerprint = new Fingerprint({
  excludeJsFonts: true,
  excludeFlashFonts: true,
  excludeCanvas: true,
  excludeWebGL: true,
  excludeScreenResolution: true
})

let fp
while (!fp) {
  fingerprint.get(result => {
    fp = result
  })
}
export const identifier = fp

window.secureStorage = new SecureStorage(window.localStorage, {
  hash: function hash (key) {
    key = crypto.SHA256(key, identifier)

    return key.toString()
  },
  encrypt: function encrypt (data) {
    data = crypto.AES.encrypt(data, identifier)

    data = data.toString()

    return data
  },
  decrypt: function decrypt (data) {
    data = crypto.AES.decrypt(data, identifier)

    data = data.toString(crypto.enc.Utf8)

    return data
  }
})

export const secureStorage = window.secureStorage
