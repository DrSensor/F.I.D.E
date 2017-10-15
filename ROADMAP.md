# Versioning

## `v0.0.0` to `v0.10.0`

- Doesn't implement `unit-test` and `end2end-test`. All patch and feature not been tested.

## `v0.10.0` to `v1.0.0`

- Breaking changes can occur in `MINOR` release (e.g `v0.n.0`)
- Some critical feature must have `unit-test` and/or `end2end-test` before released.

## `v1.x.x`

- Fully follow semver.org
- All new feature must have `unit-test` and/or `end2end-test` before released.

<br/><br/>

# Feature
## Feature on going `v1.x.x`
- File and Folder explorer in following style:
  - [] cardbox view in main section
- Linking sensor/device data (MQTT topics)
  - [] Link into file
  - [] ** Link into inside file (e.g in position x,y when its pdf/jpg/svg)
- [] View linked sensor/device in folder (not file)
- [] Registering one of the following IoT service/message broker
  - [] [AWSIoT](http://docs.aws.amazon.com/iot/latest/apireference)
  - [] [Ubidots](https://ubidots.com/docs/api/)
  - [] ** [Arduino Cloud](https://cloud.arduino.cc)
  - [] ** [ARKTIK cloud](https://developer.artik.cloud/documentation/api-reference/)
- [] Registering one of the following Cloud Storage
  - [] ** [Google Drive](https://developers.google.com/drive/v3/reference/)
  - [] [BIM360 docs](https://developer.autodesk.com/en/docs/data/v2/reference/http/)
  - [] ** [Dropbox](https://dropbox.github.io/dropbox-api-v2-explorer/)
  - [] ** [One Drive](https://docs.microsoft.com/id-id/onedrive/developer/rest-api/)
- [] Real time sensor data visualization

<br/>

## Feature on going `v2.x.x`
- [] File and Folder explorer in following style:
  - [] intuitive cardbox view in main section
  - [] tree view in sidemenu
- [] trace Folder-File by version (if integrate with Cloud Storage)
- [] Folder-File Statistics
- [] ** Sensor/Device Statistics
- [] File explorer can also support  url:
  - [] Video Stream (rtsp://) url
    - [] link sensor data into Video Stream at position x,y
    - [] * visualize sensor data as bounding box (if its camera processed data)
- [] * Choose type of chart in `real time sensor data visualization`

<br/>

## Something must be done before `v3.x.x` (in `alpha` and `beta` stage)
- [] Option to deploy as SPA (SSR or not?)
- Cloud deploy button/tutorial
  - [] Heroku
  - [] AWS
- Optimization in Continous Deployment
  - Released binary
    - [] installer in Linux (`.deb`, `.rpm`, `.run`)
    - [] installer in OS X
    - [] installer in Windows (`.exe`)
  - [] test build with latest dependency at `test-dependency` stage

<br/>

> \* : *depend on hype or available device on market* \
** : *chance not to be implemented in the current version*

---
## `v3.x.x`
- [] addons/plugins mechanism
- Dependency migration in consideration
  - Electron alternative
    - [] [thrust](https://github.com/breach/thrust)
  - change SocketIO to RPC
    - [] library like zerorpc **but** still being maintained and License compatible
