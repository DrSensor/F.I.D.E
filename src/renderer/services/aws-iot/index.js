/*
http://docs.aws.amazon.com/iot/latest/developerguide/protocols.html#mqtt-ws
https://github.com/aws/aws-iot-device-sdk-js/issues/71
https://stackoverflow.com/questions/45855214/aws-iot-node-sdk-gives-resourcenotfoundexception-for-listthings-and-creatething
*/
import { iot as Iot } from 'aws-sdk'

let options

export const register = (accessKey, secretKey) => {
  options = {
    region: 'us-west-2',
    accessKeyId: accessKey,
    secretAccessKey: secretKey
  }
}

export const IoT = new Iot(options)

export default IoT
